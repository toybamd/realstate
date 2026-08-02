from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):

    help = "Create default admin user"

    def handle(self, *args, **kwargs):

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

        self.stdout.write(
            self.style.SUCCESS(
                "Admin user ready"
            )
        )