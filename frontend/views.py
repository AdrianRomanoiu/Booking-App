from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')


def log_in(request):
    return render(request, 'frontend/login.html')


def sign_up(request):
    return render(request, 'frontend/signup.html')

