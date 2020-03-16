from django.urls import path, include
from django.contrib import admin
from .views import item_list, log_in, sign_up, DbUser, Review, locations, UserDetail, profile, \
    LocationDetail, AddLocation, add_location, AddBooking, LocationUpdate, booking, location
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, UserList
from .views import BootstrapFilterView

urlpatterns = [
    path('', item_list, name='item-list'),
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('current_user/<username>', UserDetail.as_view()),
    path('locations/', locations, name='locations'),
    path('location/<locationId>', LocationDetail.as_view()),
    path('users/', UserList.as_view()),
    path('db_user/', DbUser.as_view()),
    path('review/', Review.as_view()),
    path('log_in', log_in, name='log-in'),
    path('sign_up', sign_up, name='sign-up'),
    path('search', BootstrapFilterView, name='bootstrap'),
    path('profile', profile, name='profile'),
    path('locationId=<int:num>', location, name='location'),
    path('add/', AddLocation.as_view()),
    path('add_location/', add_location, name='add_location'),
    path('book=<int:num>', booking),
    path('booking/<locationId>', AddBooking.as_view()),
    path('update_location/<locationId>', LocationUpdate.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

