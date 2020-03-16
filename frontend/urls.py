from django.urls import path
from .views import index, log_in

urlpatterns = [
    path('', index, name='index'),
]
