from django.db import models
from usersapp.models import CustomUser


class Project(models.Model):
    title = models.CharField(max_length=128)
    link = models.URLField(max_length=200)
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    article = models.TextField(max_length=2500)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)
