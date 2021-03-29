# Generated by Django 3.1.6 on 2021-03-29 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20210327_1542'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalproduct',
            name='price_morele',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='historicalproduct',
            name='price_proline',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='historicalproduct',
            name='price_xkom',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='price_morele',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='price_proline',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='price_xkom',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
    ]