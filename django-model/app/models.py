from django.db import models
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=32)
    price = models.IntegerField(default=0)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=128)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title