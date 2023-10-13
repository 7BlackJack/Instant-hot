from django.urls import path
from . import views

urlpatterns = [
    path('search_list/<str:query>/', views.search_list),
    path('rank_history/<str:text>/', views.rank_history),
    # 为其他视图函数也添加路由
]
