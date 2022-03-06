from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from usersapp.models import CustomUser
from usersapp.serializers import CustomUserModelSerializer
# from .models import CustomUser
# from .serializers import CustomUserModelSerializer

class CustomUserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer