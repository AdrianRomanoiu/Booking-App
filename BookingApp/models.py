from django.db import models


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, default="", unique=True)
    first_name = models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=50, default="")
    address = models.CharField(max_length=100, default="")
    phone_number = models.CharField(max_length=20, default="")
    email_address = models.CharField(max_length=150, default="")


class Location(models.Model):
    locationId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, default="")
    address = models.CharField(max_length=100, default="")
    phoneNumber = models.CharField(max_length=20, default="")
    emailAddress = models.CharField(max_length=100, default="")
    webSiteAddress = models.CharField(max_length=255, default="")
    imagePath = models.ImageField(null=True)
    nrOfRooms = models.IntegerField(default=0)
    description = models.CharField(max_length=600, default="")


class Booking(models.Model):
    bookingId = models.AutoField(primary_key=True)
    locationId = models.ForeignKey(Location, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    dateFrom = models.DateField(null=True, blank=True)
    dateTo = models.DateField(null=True, blank=True)
    roomCount = models.IntegerField(default=0)
    price = models.FloatField(default=0.0)


class Review(models.Model):
    reviewId = models.AutoField(primary_key=True)
    locationId = models.ForeignKey(Location, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, default="")
    score = models.IntegerField(default=0)
    date = models.DateField(null=True, blank=True)


class CreditCard(models.Model):
    creditCardId = models.AutoField(primary_key=True)
    cardNumber = models.CharField(max_length=20, default="")
    ccv = models.CharField(max_length=3, default="")


class Payment(models.Model):
    paymentId = models.AutoField(primary_key=True)
    bookingId = models.ForeignKey(Booking, on_delete=models.CASCADE)
    creditCardId = models.ForeignKey(CreditCard, on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=False)


class RoomType(models.Model):
    roomTypeId = models.AutoField(primary_key=True)
    description = models.CharField(max_length=300, default="")
    roomType = models.CharField(max_length=20, default="")


class Room(models.Model):
    roomId = models.AutoField(primary_key=True)
    locationId = models.ForeignKey(Location, on_delete=models.CASCADE)
    roomTypeId = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    price = models.FloatField(default=0.0)


class RoomBooked(models.Model):
    roomBookedId = models.AutoField(primary_key=True)
    bookingId = models.ForeignKey(Booking, on_delete=models.CASCADE)
    roomId = models.ForeignKey(Room, on_delete=models.CASCADE)
