import math

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .models import CustomUser
from todoapp.models import Project

from .views import CustomUserCustomViewSet
from .models import CustomUser
# Create your tests here.


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin'
        self.email = 'admin@mail.ru'

        self.data = {'first_name': 'Иван', 'last_name': 'Иванов', 'email': 'ivan@ivan.ru'}
        self.data_put = {'first_name': 'Nik', 'last_name': 'Petrov', 'email': 'nik@petrov.ru'}
        self.url = '/api/users/'
        self.admin = CustomUser.objects.create_superuser(username=self.name, password=self.password, email=self.email)

    def test_get_list(self):
        factory = APIRequestFactory()           #создаем объект класса APIRequestFactory
        request = factory.get(self.url)         #отпределяем адрес для отправки запроса
        view = CustomUserCustomViewSet.as_view({'get': 'list'})     #создаем необходимый тип запроса
        response = view(request) #эмулируем запрос (как будто отрпавляем на сервер)
        self.assertEqual(response.status_code, status.HTTP_200_OK) #сверяем полученный ответ с тем, что должно быть

    def test_create_guest(self): #создать автора как гость(UNAUTHORIZED USER)
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = CustomUserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self): #создать автора как admin(AUTHORIZED USER)
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        force_authenticate(request, self.admin) #авторизуемся
        view = CustomUserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        user = CustomUser.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_api(self):
        client = APIClient()
        user = CustomUser.objects.create(**self.data)
        response = client.post(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        auth = CustomUser.objects.get(id=user.id)
        self.assertEqual(auth.first_name, 'Иван')
        self.assertEqual(auth.last_name, 'Иванов')
        self.assertEqual(auth.email, 'ivan@ivan.ru')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestMath(APISimpleTestCase):

    def test_sqrt(self):
        response = math.sqrt(4)
        self.assertEqual(response, 2)


class TestProjectViewSet(APITestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin'
        self.email = 'admin@mail.ru'
        self.data_user = {'first_name': 'Иван', 'last_name': 'Иванов', 'email': 'ivan55@ivan.ru'}
        # self.user = CustomUser.objects.create(**self.data_user)

        # self.data = {'title': 'TitleCreate', 'link': 'https://github.com/Knarik8/todo', 'users': self.user}
        self.data_pj = {'title': 'TitleCreate', 'link': 'https://github.com/Knarik8/todo'}
        # self.data_put = {'title': 'TitleUpdate', 'link': 'https://github.com/Knarik8/todo', 'users': self.user}

        self.url = '/api/projects/'
        self.admin = CustomUser.objects.create_superuser(username=self.name, password=self.password, email=self.email)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        project = Project.objects.create(**self.data_pj)
        user = CustomUser.objects.create(**self.data_user)
        project.users.add(user)
        project_update = Project.objects.create(title='TitleUpdate', link='https://github.com/Knarik8/todo')
        project_update.users.add(user)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{project.id}/', {'title': 'TitleUpdate', 'link': 'https://github.com/Knarik8/todo', 'users': project.users})
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_update = Project.objects.get(id=project.id)
        self.assertEqual(project_update.title, 'TitleUpdate')
        self.client.logout()

    def test_put_mixer(self):
        project = mixer.blend(Project)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{project.id}/',
                                   {'title': 'TitleUpdate', 'link': 'https://github.com/Knarik8/todo',
                                    'users': project.users})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_1 = Project.objects.get(id=project.id)
        self.assertEqual(project_1.title, 'TitleUpdate')
        self.client.logout()

    def test_put_mixer_field(self):
        project = mixer.blend(Project, title='Проект')
        self.assertEqual(project.title, 'Проект')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{project.id}/',
                                   {'title': 'TitleUpdate', 'link': 'https://github.com/Knarik8/todo',
                                    'users': project.users})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_1 = Project.objects.get(id=project.id)
        self.assertEqual(project_1.title, 'TitleUpdate')
        self.client.logout()

    def tearDown(self) -> None:
        pass

