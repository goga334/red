from django.db import models

class User(models.Model):
    username = models.CharField("Username", max_length=255)
    group = models.CharField("Group", max_length=255)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.username

class Group(models.Model):
    name = models.CharField("Name", max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name