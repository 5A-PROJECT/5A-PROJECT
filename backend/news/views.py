from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from decouple import config
import numpy as np
import requests
import re
import os

# Create your views here.

naver_url = 'https://openapi.naver.com/v1/search/news.json'
naver_headers = {
    'X-Naver-Client-Id': config('NAVER_ID'),
    'X-Naver-Client-Secret': config('NAVER_SC')
}


def check_lang(query):
    ko, en = 0, 0
    for q in query:
        if ord('가') <= ord(q) <= ord('힣'):
            ko += 1
        elif ord('a') <= ord(q) <= ord('z'):
            en += 1
        elif ord('A') <= ord(q) <= ord('Z'):
            en += 1
    return 'ko' if ko >= en else 'en'


@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
@authentication_classes([JSONWebTokenAuthentication, ])
def evaluate(request):
    query = request.query_params.get('query')
    if query == None:
        return HttpResponse(status=400)
    display = request.query_params.get('display', 100)
    lang = check_lang(query)

    naver_newses = requests.get(
        naver_url, headers=naver_headers,
        params={'query': '"' + query + '"', 'display': display, 'sort': 'sim'}
    ).json()
    articles = naver_newses.get('items')

    row_X, links, descriptions = [], [], []
    for article in articles:
        row_X.append(article.get(
            'title'
        ).replace('<b>', '').replace('</b>', ''))
        links.append(article.get('originallink') or article.get('link'))
        descriptions.append(article.get(
            'description'
        ).replace('<b>', '').replace('</b>', ''))

    from konlpy.tag import Okt

    tokenizer = Okt()

    words = {}
    if 'words.pkl' in os.listdir('.\\news\\models\\'):
        pass

    for title in row_X:
        title = re.sub(
            r'[!"#$%&()*+.,-/:;=?@[\]^_`{|}~\'0-9a-zA-Z·…]', '', title)
        title = re.sub(r'[ ]+', '', title)
        tokens = tokenizer.morphs(title)
        for token in tokens:
            words[token] = 1 if token not in words else words[token] + 1

    word_to_idx = {}
    for key, val in sorted(words.items(), key=lambda x: -x[1]):
        word_to_idx[key] = len(word_to_idx) + 1
        if len(word_to_idx) >= 5000:
            break

    X = []
    for title in row_X:
        title = re.sub(
            r'[!"#$%&()*+.,-/:;=?@[\]^_`{|}~\'0-9a-zA-Z·…]', '', title)
        title = re.sub(r'[ ]+', '', title)
        tokens = tokenizer.morphs(title)
        raw = []
        for token in tokens:
            num = word_to_idx[token] if token in word_to_idx else 0
            raw.append(num)
        if len(raw) < 30:
            raw += [0] * (30 - len(raw))
        X.append(raw)
    X = np.array(X)

    from tensorflow.keras.models import load_model

    if lang == 'ko':
        model = load_model('.\\news\\models\\best_model_ko.h5')
    else:
        model = load_model('.\\news\\models\\best_model_us.h5')

    predicts = model.predict(X)
    y = []
    for pred in predicts:
        res = 1 if pred[1] >= pred[0] else 0
        y.append(res)

    return JsonResponse({
        'news': row_X, 'links': links,
        'descriptions': descriptions,
        'results': y
    })
