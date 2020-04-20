from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


class Stock(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    count = models.IntegerField()
    buy_price = models.FloatField()
    current_price = models.FloatField()
    currency = models.CharField(max_length=10)
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='stocks')

    def __str__(self):
        return self.name
