# Generated by Django 2.2.6 on 2020-01-05 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookingApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='locationId',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
