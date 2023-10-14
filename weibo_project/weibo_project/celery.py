from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# 设置Django设置模块的环境变量
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'weibo_project.settings')

app = Celery('weibo_project')

# 使用字符串来定义这里的配置，以便于使用在任何地方都能重新配置Celery
app.config_from_object('django.conf:settings', namespace='CELERY')

# 从所有已注册的Django app configs中加载任务模块
app.autodiscover_tasks()
