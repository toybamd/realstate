from django.urls import path
from .views import (
    AdminUsersView,
    AdminUserDeleteView,
)
from .views import create_admin

from .views import (
    # Public
    PropertyList,
    PropertyDetail,

    # Bookings
    BookingCreate,
    MyBookings,

    # Authentication
    UserRegister,
    AdminCheck,

    # Favorites
    FavoriteList,
    FavoriteCreate,
    FavoriteDelete,

    # Notifications
    NotificationList,
    NotificationRead,

    # Admin
    AdminPropertyList,
    AdminPropertyDetail,
    AdminBookingList,
    AdminBookingUpdate,
)
from .views import profile_view
urlpatterns = [

    # ==========================================
    # PUBLIC PROPERTY APIs
    # ==========================================

    path(
        "properties/",
        PropertyList.as_view(),
        name="properties",
    ),
    path(

    "admin/users/",

    AdminUsersView.as_view(),

    name="admin-users"

),

    path(

     "admin/users/<int:pk>/",

     AdminUserDeleteView.as_view(),

     name="admin-user-delete"

    ),

    path(
        "properties/<int:pk>/",
        PropertyDetail.as_view(),
        name="property-detail",
    ),

    # ==========================================
    # BOOKINGS
    # ==========================================

    path(
        "bookings/",
        BookingCreate.as_view(),
        name="booking-create",
    ),

    path(
        "my-bookings/",
        MyBookings.as_view(),
        name="my-bookings",
    ),

    # ==========================================
    # FAVORITES
    # ==========================================

    path(
        "favorites/",
        FavoriteList.as_view(),
        name="favorites",
    ),

    path(
        "favorites/add/",
        FavoriteCreate.as_view(),
        name="favorite-add",
    ),

    path(
        "favorites/<int:pk>/",
        FavoriteDelete.as_view(),
        name="favorite-delete",
    ),

    # ==========================================
    # NOTIFICATIONS
    # ==========================================

    path(
        "notifications/",
        NotificationList.as_view(),
        name="notifications",
    ),

    path(
        "notifications/<int:pk>/read/",
        NotificationRead.as_view(),
        name="notification-read",
    ),

    # ==========================================
    # USER AUTHENTICATION
    # ==========================================

    path(
        "register/",
        UserRegister.as_view(),
        name="register",
    ),

    path(
        "admin-check/",
        AdminCheck.as_view(),
        name="admin-check",
    ),
    # ==========================================
# USER PROFILE
# ==========================================

    path(
    "profile/",
    profile_view,
    name="profile",
    ),
    # ==========================================
    # ADMIN PROPERTY MANAGEMENT
    # ==========================================

    path(
        "admin/properties/",
        AdminPropertyList.as_view(),
        name="admin-properties",
    ),

    path(
        "admin/properties/<int:pk>/",
        AdminPropertyDetail.as_view(),
        name="admin-property-detail",
    ),

    # ==========================================
    # ADMIN BOOKING MANAGEMENT
    # ==========================================

    path(
        "admin/bookings/",
        AdminBookingList.as_view(),
        name="admin-bookings",
    ),

    path(
        "admin/bookings/<int:pk>/",
        AdminBookingUpdate.as_view(),
        name="admin-booking-update",
    ),
    path(
        "create-admin/",
         create_admin
    ),
    
]