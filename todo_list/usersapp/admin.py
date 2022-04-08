from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from usersapp.models import CustomUser

#расширенная версия
class CustomUserAdmin(UserAdmin):
    add_fieldsets = (
        (
            None,
            {"classes": ("wide",), "fields":
                (
                    "username", "password1", "password2", "email")},
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)


# можно просто admin.site.register(CustomUser)