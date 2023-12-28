from django.db import models
from django.utils import timezone

class User(models.Model):
    username = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=128)
    registration_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'user'  # 指定数据库中的表名
