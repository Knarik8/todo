from django.core.management import BaseCommand
from django.db import IntegrityError

from usersapp.models import CustomUser
# from todo.todo_list.usersapp.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            user = CustomUser.objects.create_superuser(
                username='django',
                email='armisha15@mail.ru',
                password='django')
            print(f'{user} создан')
        except IntegrityError:
            print(f'Администратор уже зарегистрирован')
        try:
            user_1 = CustomUser.objects.create_user(
                username='IvanIvanov',
                first_name='Ivan',
                last_name='Ivanov',
                email='ivanov@ivanov.ru'
            )
            print(f'{user_1} создан')
        except IntegrityError:
            print(f'Пользователь уже существует')