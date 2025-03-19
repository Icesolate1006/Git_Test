from django.urls import path
from .views import greet_user, upload_file

urlpatterns = [
    path('greet/', greet_user, name='greet_user'),
    path('upload/', upload_file, name='upload_file'),
]