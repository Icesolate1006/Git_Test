from django.urls import path
from .views import greet_user, upload_file, UploadFileView

urlpatterns = [
    path('greet/', greet_user, name='greet_user'),
    path('upload/', upload_file, name='upload_file'),
    path('upload/', UploadFileView.as_view(), name='upload-file'),
]