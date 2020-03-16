from .models import User as U
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, DbUserSerializer, ReviewSerializer, LocationSerializer, BookingSerializer
from django.shortcuts import render
from .models import Location
from .models import Booking
from datetime import *
import os
from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
path = os.path.join(base_dir, 'frontend/templates/frontend/')


def add_location(request):
    return render(request, path + "add_location.html")


def location(request, num=1):
    location_data = {'item': Location.objects.get(locationId=num)}
    return render(request, path + "location.html", location_data)


def booking(request, num=1):
    location_data = {'item': Location.objects.get(locationId=num)}
    return render(request, path + "book.html", location_data)


def item_list(request):
    context = {'items': Location.objects.all()}
    return render(request, path + "index.html", context)


def log_in(request):
    users = {'users': U.objects.all()}
    return render(request, path + "login.html", users)


def sign_up(request):
    return render(request, path + "signup.html")


def profile(request):
    return render(request, path + "profile.html")


class UserDetail(RetrieveAPIView):
    lookup_field = 'username'
    queryset = U.objects.all()
    serializer_class = DbUserSerializer


class LocationDetail(RetrieveAPIView):
    permission_classes = [AllowAny]

    lookup_field = 'locationId'
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class AddLocation(CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class AddBooking(CreateAPIView):
    lookup_field = 'locationId'

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class LocationUpdate(UpdateAPIView):
    lookup_field = 'locationId'

    queryset = Location.objects.all()
    serializer_class = LocationSerializer


def BootstrapFilterView(request):
    ok = False
    booking_obj = Booking.objects.all()
    qs = Location.objects.all()
    locationName_query = request.GET.get('Name')
    address_query = request.GET.get('Address')
    nrOfRooms_query = request.GET.get('nrOfRooms')
    checkIn_query = request.GET.get('CheckIn')
    checkOut_query = request.GET.get('CheckOut')

    if address_query != '' and address_query is not None:
        qs = qs.filter(address__icontains=address_query)

    if locationName_query != '' and locationName_query is not None:
        qs = qs.filter(name__iexact=locationName_query)

    if nrOfRooms_query != '' and nrOfRooms_query is not None:
        qs = qs.filter(nrOfRooms__gte=nrOfRooms_query)

    if checkIn_query is not None and checkIn_query != '' and checkOut_query is not None and checkOut_query != '':
        date_time_checkIn = datetime.strptime(checkIn_query, '%Y-%m-%d')
        date_time_checkOut = datetime.strptime(checkOut_query, '%Y-%m-%d')
        if date_time_checkIn > date_time_checkOut:
            qs = ()
        else:
            for j in qs:
                for i in booking_obj:
                    if j.locationId == i.locationId.locationId and not (
                            (date_time_checkIn < datetime(i.dateFrom.year, i.dateFrom.month,
                                                          i.dateFrom.day) and date_time_checkOut < datetime(
                                i.dateFrom.year, i.dateFrom.month,
                                i.dateFrom.day)) or (
                                    date_time_checkIn > datetime(i.dateTo.year, i.dateTo.month,
                                                                 i.dateTo.day) and date_time_checkOut > datetime(
                                i.dateTo.year, i.dateTo.month,
                                i.dateTo.day))):
                        ok = True
                if ok:
                    qs = qs.exclude(locationId=j.locationId)
                    ok = False
    else:
        print('Campurile de date sunt goale')
    context = {
        'queryset': qs
    }
    return render(request, path + "bootstrap_form.html", context)


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def locations(request, *args, **kwargs):
    queryset = Location.objects.all()
    serializer = DbUserSerializer(queryset, many=True)
    return Response(serializer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DbUser(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = DbUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Review(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        print(request.data)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
