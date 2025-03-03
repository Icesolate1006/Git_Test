from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def greet_user(request):
    name = request.data.get('name', '')
    if name:
        return Response({"message": f"Hello {name}!"})
    return Response({"message": "Hello, stranger!"})