
from celery import shared_task
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "price_browser.settings")
import django
django.setup()

import requests
from bs4 import BeautifulSoup
from core.models import Product
from decimal import Decimal
from product.serializers import ProductSerializer

@shared_task
def get_price_morele(products_list=Product.objects.all()):
    """Get product prices from morele via link and update prices"""
    for product in products_list:
        try:
            page = requests.get(product.link_morele, headers={'User-Agent': 'Mozilla/5.0'})
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(content.find('div', id='product_price_brutto').text.replace(' ', '').strip()[:-2])
            if price != product.price_morele:
                serializer = ProductSerializer(product, data={'price_morele': price}, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)
            print(get_price_morele.__name__)


@shared_task()
def get_price_xkom(products_list=Product.objects.all()):
    """Get product prices from xkom via link and update prices"""
    for product in products_list:
        try:
            page = requests.get(product.link_xkom, headers={'User-Agent': 'Opera/9.60'})
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(content.find('div', class_='u7xnnm-4 jFbqvs').text.replace(' ', '').replace(',', '.')[:-2])
            if price != product.price_xkom:
                serializer = ProductSerializer(product, data={'price_xkom': price}, partial=True)
                if serializer.is_valid():
                    serializer.save()

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)
            print(get_price_xkom.__name__)



