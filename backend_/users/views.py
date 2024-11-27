# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Customers, Account, Location, Transaction, Card, Loan
from .serializers import CustomerSerializer, AccountSerializer, LocationSerializer, TransactionSerializer, CardSerializer, LoanSerializer

# Vista para login y generación de tokens JWT
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        # Autenticar usuario
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            })
        else:
            return Response(
                {"detail": "Credenciales inválidas"}, status=401
            )

# ViewSets para los modelos

class CustomersViewSet(viewsets.ModelViewSet):
    queryset = Customers.objects.all()
    serializer_class = CustomerSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
