from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db import models


class Notification(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )


    title = models.CharField(
        max_length=200
    )


    message = models.TextField()


    is_read = models.BooleanField(
        default=False
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return self.title
class Property(models.Model):

    PROPERTY_TYPES = [
        ("Villa", "Villa"),
        ("Apartment", "Apartment"),
        ("Family Home", "Family Home"),
        ("Luxury Home", "Luxury Home"),
        ("Smart Home", "Smart Home"),
    ]


    title = models.CharField(
        max_length=200
    )


    description = models.TextField()



    price = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )



    location = models.CharField(
        max_length=200
    )



    property_type = models.CharField(
        max_length=30,
        choices=PROPERTY_TYPES
    )



    bedrooms = models.PositiveIntegerField(
        default=1
    )


    bathrooms = models.PositiveIntegerField(
        default=1
    )


    garage = models.PositiveIntegerField(
        default=0
    )



    area = models.PositiveIntegerField(
        help_text="Area in square meters"
    )



    year_built = models.PositiveIntegerField()



    featured = models.BooleanField(
        default=False
    )



    available = models.BooleanField(
        default=True
    )



    image = models.ImageField(
        upload_to="properties/"
    )



    created_at = models.DateTimeField(
        auto_now_add=True
    )



    def __str__(self):

        return self.title





class PropertyImage(models.Model):


    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images"
    )


    image = models.ImageField(
        upload_to="properties/gallery/"
    )


    def __str__(self):

        return f"{self.property.title} Image"






class Booking(models.Model):


    STATUS_CHOICES = [

    ("Pending", "Pending"),

    ("Approved", "Approved"),

    ("Rejected", "Rejected"),

    ("Completed", "Completed"),

    ("Cancelled", "Cancelled"),

    ]



    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )



    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="bookings"
    )



    full_name = models.CharField(
        max_length=150
    )



    email = models.EmailField()



    phone = models.CharField(
        max_length=30
    )



    preferred_date = models.DateField()



    preferred_time = models.TimeField()



    message = models.TextField(
        blank=True
    )



    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )



    created_at = models.DateTimeField(
        auto_now_add=True
    )



    def __str__(self):

        return f"{self.user.username} - {self.property.title}"
from django.contrib.auth.models import User

class Favorite(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = (
            "user",
            "property"
        )

    def __str__(self):

        return f"{self.user.username} - {self.property.title}"    