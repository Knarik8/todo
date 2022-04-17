from rest_framework.serializers import ModelSerializer

from usersapp.models import CustomUser

class CustomUserModelSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class CustomUserFullModelSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')
