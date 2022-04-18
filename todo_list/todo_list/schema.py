# import graphene
from graphene import ObjectType, Schema, List
from graphene import String
from graphene_django import DjangoObjectType
from usersapp.models import CustomUser
from todoapp.models import Project, Todo


# class Query(ObjectType):
#     hello = String(default_value='HI')

class UserType(DjangoObjectType):

    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(ObjectType):
    all_users = List(UserType)

    all_projects = List(ProjectType)

    all_todos = List(TodoType)

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all()


schema = Schema(query=Query)