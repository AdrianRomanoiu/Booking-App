from django.contrib import admin
from .models import Location, User, Booking, Review, CreditCard, Payment, RoomType, RoomBooked, Room

admin.site.register(Location)
admin.site.register(User)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(CreditCard)
admin.site.register(Payment)
admin.site.register(RoomType)
admin.site.register(RoomBooked)
admin.site.register(Room)