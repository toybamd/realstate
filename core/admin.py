from django.contrib import admin
from .models import Property, PropertyImage, Booking


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "price",
        "location",
        "property_type",
        "featured",
        "available",
    )

    list_filter = (
        "property_type",
        "featured",
        "available",
    )

    search_fields = (
        "title",
        "location",
    )

    inlines = [PropertyImageInline]


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "property",
        "email",
        "phone",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
    )