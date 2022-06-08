from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model

# Create your views here.


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = get_user_model().objects.filter(username=username).first()
        if user is not None:
            if user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
        return Response({'error': 'Wrong Credentials'}, status=400)


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        if get_user_model().objects.filter(username=username).exists():
            return Response({'error': 'User with this username already exists'}, status=400)

        first_name, last_name = request.data.get('full_name').split(' ')
        password = request.data.get('password')

        user = get_user_model().objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        token = Token.objects.create(user=user)
        return Response({'Token': token.key})
