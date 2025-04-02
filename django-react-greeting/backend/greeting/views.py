from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# For email
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UploadSerializer
from django.core.mail import send_mail

@api_view(['POST'])
def greet_user(request):
    name = request.data.get('name', '')
    if name:
        return Response({"message": f"Hello {name}!"})
    return Response({"message": "Hello, stranger!"})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])  # Allows handling of file data
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    uploaded_file = request.FILES['file']  # Get the uploaded file
    file_name = default_storage.save(uploaded_file.name, ContentFile(uploaded_file.read()))  # Save the file

    return Response({"message": f"File '{uploaded_file.name}' uploaded successfully!", "file_path": file_name})

class UploadFileView(APIView):
    def post(self, request):
        serializer = UploadSerializer(data=request.data)
        if serializer.is_valid():
            upload_instance = serializer.save()
            # Send email
            send_mail(
                'Your file has been uploaded!',
                'Thank you for your submission.',
                'your_email@gmail.com',
                [upload_instance.email],
                fail_silently=False,
            )
            return Response({'message': 'File uploaded and email sent!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)