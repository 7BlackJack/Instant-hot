from django.urls import path
from . import views

urlpatterns = [
    path('search_list/<str:query>/', views.search_list),
    path('rank_history/<str:text>/', views.rank_history),
    path('time_id/<str:timestamp>/', views.time_id),
    path('time_id_by_name/<str:name>/', views.time_id_by_name),
    path('all_data_list/<str:time_id>/', views.all_data_list),
    path('translate/', views.translate)
]
