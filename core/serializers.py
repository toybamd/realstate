from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notification
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Property,
    PropertyImage,
    Booking,
    Favorite,
)



# =========================
# Property Images
# =========================

class PropertyImageSerializer(serializers.ModelSerializer):

    class Meta:

        model = PropertyImage

        fields = [
            "id",
            "image",
        ]





# =========================
# Property
# =========================

class PropertySerializer(serializers.ModelSerializer):


    images = PropertyImageSerializer(
        many=True,
        read_only=True
    )


    class Meta:

        model = Property

        fields = [
            "id",
            "title",
            "description",
            "price",
            "location",
            "property_type",
            "bedrooms",
            "bathrooms",
            "garage",
            "area",
            "year_built",
            "featured",
            "available",
            "image",
            "images",
            "created_at",
        ]





# =========================
# Booking
# =========================

class BookingSerializer(serializers.ModelSerializer):


    property = PropertySerializer(
        read_only=True
    )


    class Meta:

        model = Booking

        fields = [
            "id",
            "property",
            "full_name",
            "email",
            "phone",
            "preferred_date",
            "preferred_time",
            "message",
            "status",
            "created_at",
        ]


        read_only_fields = [
            "user",
            "created_at",
        ]




# =========================
# Booking Create Serializer
# =========================

class BookingCreateSerializer(serializers.ModelSerializer):

    class Meta:

        model = Booking

        fields = [
            "property",
            "full_name",
            "email",
            "phone",
            "preferred_date",
            "preferred_time",
            "message",
        ]
# =========================
# Booking Update Serializer
# =========================

class BookingUpdateSerializer(serializers.ModelSerializer):

    class Meta:

        model = Booking

        fields = [
            "status",
        ]        

# =========================
# Favorite Read Serializer
# =========================

class FavoriteSerializer(serializers.ModelSerializer):


    property = PropertySerializer(
        read_only=True
    )


    class Meta:

        model = Favorite


        fields = [
            "id",
            "property",
            "created_at",
        ]


        read_only_fields = [
            "user",
        ]







# =========================
# Favorite Create Serializer
# =========================

class FavoriteCreateSerializer(serializers.ModelSerializer):


    class Meta:

        model = Favorite


        fields = [
            "property"
        ]







# =========================
# Register
# =========================

class RegisterSerializer(serializers.ModelSerializer):


    password = serializers.CharField(
        write_only=True
    )



    class Meta:

        model = User


        fields = [
            "username",
            "email",
            "password",
        ]



    def create(self, validated_data):

        return User.objects.create_user(

            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"],

        )
class NotificationSerializer(serializers.ModelSerializer):


    class Meta:

        model = Notification

        fields = [
            "id",
            "title",
            "message",
            "is_read",
            "created_at",
        ]


class AdminUserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [

            "id",

            "username",

            "email",

            "is_staff",

            "is_superuser",

            "date_joined",

        ]