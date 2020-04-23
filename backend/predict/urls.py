from django.urls import path
from . import views

urlpatterns = [
    path('commodities/', views.commodities),
    path('indices/', views.indices),
]
