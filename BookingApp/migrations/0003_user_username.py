# Generated by Django 2.2.6 on 2020-01-08 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookingApp', '0002_auto_20200105_2230'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=30, unique=True),
        ),
    ]
