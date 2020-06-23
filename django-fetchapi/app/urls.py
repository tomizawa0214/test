from django.urls import path
from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('addblog/', views.addblog, name='addblog'),
    path('', views.searchblog, name='searchblog'),
]