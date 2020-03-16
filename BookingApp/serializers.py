from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import User as U
from .models import Review, Location, Booking


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class DbUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = U
        fields = ('userId', 'username', 'first_name', 'last_name', 'address', 'phone_number', 'email_address',)


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('locationId', 'userId', 'name', 'address', 'phoneNumber', 'emailAddress', 'webSiteAddress', 'imagePath', 'nrOfRooms', 'description')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('bookingId', 'locationId', 'dateFrom', 'userId', 'dateTo', 'roomCount', 'price')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('locationId', 'userId', 'description', 'score', 'date')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')