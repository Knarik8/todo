from rest_framework.serializers import ModelSerializer

from usersapp.models import CustomUser

class CustomUserModelSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email')