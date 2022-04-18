from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets, permissions

from usersapp.models import CustomUser
from usersapp.serializers import CustomUserModelSerializer, CustomUserFullModelSerializer


# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer


class CustomUserCustomViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    # serializer_class = CustomUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return CustomUserFullModelSerializer
        return CustomUserModelSerializer