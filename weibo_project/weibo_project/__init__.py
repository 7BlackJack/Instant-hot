# __init__.py

from __future__ import absolute_import, unicode_literals

# 这将确保应用程序总是在Django启动时导入。
from .celery import app as celery_app

__all__ = ('celery_app',)
