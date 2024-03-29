"""todo_list URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken import views

from rest_framework.routers import DefaultRouter
from usersapp.views import CustomUserCustomViewSet
from todoapp.views import ProjectModelViewSet, TodoModelViewSet

from drf_yasg import openapi
from drf_yasg.views import get_schema_view


schema_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version = 'v2',
        description = 'My project',
        contact=openapi.Contact(email='test@mail.ru'),
        license=openapi.License(name='MT')
    ),
    public=True,
    # permission_classes=(permissions.IsAdminUser,)
)


router = DefaultRouter()
# router.register('users', CustomUserModelViewSet)
router.register('users', CustomUserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

    path('graphql/', GraphQLView.as_view(graphiql=True))
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),
    # path('swagger<str:format>/', schema_view.without_ui()),
    # path('api/<str:version>/users/', CustomUserCustomViewSet.as_view({'get': 'list'}))
    # path('api/<users>/v1/', include('usersapp.urls', namespace='v1')),
    # path('api/<users>/v2/', include('usersapp.urls', namespace='v2'))
]
