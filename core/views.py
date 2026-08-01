from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import generics
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    IsAdminUser,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import AdminUserSerializer

from rest_framework.permissions import IsAdminUser

from rest_framework import generics
from rest_framework.response import Response


from .models import (
    Property,
    PropertyImage,
    Booking,
    Favorite,
)


from .serializers import (
    PropertySerializer,
    BookingSerializer,
    RegisterSerializer,
    FavoriteSerializer,
    FavoriteCreateSerializer,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile_view(request):

    user = request.user


    if request.method == "GET":

        return Response({

            "username": user.username,

            "first_name": user.first_name,

            "last_name": user.last_name,

            "email": user.email,

        })



    if request.method == "PUT":


        user.first_name = request.data.get(
            "first_name",
            user.first_name
        )


        user.last_name = request.data.get(
            "last_name",
            user.last_name
        )


        user.email = request.data.get(
            "email",
            user.email
        )


        user.save()



        return Response({

            "message":
            "Profile updated successfully",


            "username":
            user.username,


            "first_name":
            user.first_name,


            "last_name":
            user.last_name,


            "email":
            user.email

        })



# ==========================================
# PUBLIC PROPERTY APIs
# ==========================================


class PropertyList(generics.ListAPIView):

    serializer_class = PropertySerializer


    def get_queryset(self):

        queryset = Property.objects.filter(
            available=True
        )


        search = self.request.GET.get("search")

        property_type = self.request.GET.get("type")

        bedrooms = self.request.GET.get("bedrooms")

        min_price = self.request.GET.get("min_price")

        max_price = self.request.GET.get("max_price")



        if search:

            queryset = queryset.filter(

                Q(title__icontains=search)
                |
                Q(location__icontains=search)

            )



        if property_type:

            queryset = queryset.filter(
                property_type=property_type
            )



        if bedrooms:

            queryset = queryset.filter(
                bedrooms=bedrooms
            )



        if min_price:

            queryset = queryset.filter(
                price__gte=min_price
            )



        if max_price:

            queryset = queryset.filter(
                price__lte=max_price
            )


        return queryset

class AdminUsersView(generics.ListAPIView):

    queryset = User.objects.all().order_by("-date_joined")

    serializer_class = AdminUserSerializer

    permission_classes = [IsAdminUser]


class AdminUserDeleteView(generics.DestroyAPIView):

    queryset = User.objects.all()

    serializer_class = AdminUserSerializer

    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):

        user = self.get_object()

        if user == request.user:

            return Response(

                {"error": "You cannot delete yourself."},

                status=400

            )

        return super().destroy(request, *args, **kwargs)





class PropertyDetail(generics.RetrieveAPIView):

    queryset = Property.objects.all()

    serializer_class = PropertySerializer







# ==========================================
# FAVORITES
# ==========================================


class FavoriteList(generics.ListAPIView):

    serializer_class = FavoriteSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Favorite.objects.filter(

            user=self.request.user

        )
class FavoriteCreate(generics.CreateAPIView):

    serializer_class = FavoriteCreateSerializer

    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )
class FavoriteDelete(generics.DestroyAPIView):

    serializer_class = FavoriteSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Favorite.objects.filter(
            user=self.request.user
        )



# ==========================================
# BOOKINGS
# ==========================================



# ==========================================
# BOOKINGS
# ==========================================

from .serializers import (
    BookingSerializer,
    BookingCreateSerializer,
    BookingUpdateSerializer,
)


from django.contrib.auth.models import User

from django.contrib.auth.models import User

class BookingCreate(generics.CreateAPIView):

    queryset = Booking.objects.all()

    serializer_class = BookingCreateSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        booking = serializer.save(user=self.request.user)

        # Customer notification
        Notification.objects.create(
            user=self.request.user,
            title="Booking Submitted",
            message=f"Your booking request for {booking.property.title} has been received."
        )

        # Notify every admin
        admins = User.objects.filter(
            is_staff=True
        )

        for admin in admins:

            Notification.objects.create(
                user=admin,
                title="New Booking Request",
                message=f"{booking.user.username} booked '{booking.property.title}'."
            )
class MyBookings(generics.ListAPIView):

    serializer_class = BookingSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Booking.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

# ==========================================
# USER REGISTER
# ==========================================

class UserRegister(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = [
        AllowAny
    ]


# ==========================================
# ADMIN CHECK
# ==========================================


class AdminCheck(APIView):

    permission_classes = [
        IsAuthenticated
    ]



    def get(self,request):

        return Response({

            "is_staff":
                request.user.is_staff,


            "is_superuser":
                request.user.is_superuser,


            "username":
                request.user.username

        })










# ==========================================
# ADMIN PROPERTY MANAGEMENT
# ==========================================



class AdminPropertyList(
    generics.ListCreateAPIView
):


    queryset = Property.objects.all()

    serializer_class = PropertySerializer

    permission_classes = [
        IsAdminUser
    ]



    def perform_create(self,serializer):

        property = serializer.save()


        images = self.request.FILES.getlist(
            "gallery"
        )


        for image in images:


            PropertyImage.objects.create(

                property=property,

                image=image

            )









class AdminPropertyDetail(
    generics.RetrieveUpdateDestroyAPIView
):


    queryset = Property.objects.all()

    serializer_class = PropertySerializer

    permission_classes = [
        IsAdminUser
    ]









# ==========================================
# ADMIN BOOKING MANAGEMENT
# ==========================================
# ==========================================
# NOTIFICATIONS
# ==========================================


class NotificationList(generics.ListAPIView):

    serializer_class = NotificationSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        ).order_by(
            "-created_at"
        )



class NotificationRead(generics.UpdateAPIView):

    serializer_class = NotificationSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        )


    def perform_update(self,serializer):

        serializer.save(
            is_read=True
        )


# ==========================================
# ADMIN BOOKING MANAGEMENT
# ==========================================

class AdminBookingList(generics.ListAPIView):

    queryset = Booking.objects.all().order_by("-created_at")

    serializer_class = BookingSerializer

    permission_classes = [IsAdminUser]


class AdminBookingUpdate(generics.RetrieveUpdateAPIView):

    queryset = Booking.objects.all()

    serializer_class = BookingUpdateSerializer

    permission_classes = [IsAdminUser]

    def perform_update(self, serializer):

        booking = serializer.save()

        if booking.status == "Confirmed":

            title = "Booking Confirmed"

        elif booking.status == "Cancelled":

            title = "Booking Cancelled"

        elif booking.status == "Completed":

            title = "Visit Completed"

        else:

            title = "Booking Updated"

        Notification.objects.create(
            user=booking.user,
            title=title,
            message=f"Your booking for '{booking.property.title}' has been {booking.status}."
        )
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

User = get_user_model()


@api_view(["GET"])
def create_admin(request):

    username = "toybaadmin"
    password = "Toyba12345"

    user, created = User.objects.get_or_create(
        username=username
    )

    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.is_active = True
    user.save()

    return Response({
        "message": "Admin recreated",
        "username": user.username,
        "staff": user.is_staff,
        "superuser": user.is_superuser,
        "active": user.is_active,
    })