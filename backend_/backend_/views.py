# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Aquí agregamos la lógica de autenticación
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            # Si la autenticación es exitosa, generamos el token
            refresh = RefreshToken.for_user(user)
            return Response({'access_token': str(refresh.access_token)})
        return Response({'error': 'Invalid credentials'}, status=400)

