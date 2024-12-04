# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.urls import path
from django.db.models import Count, Sum


from .models import Customers, Account, Location, Transaction, Card, Loan, CardType
from .serializers import CustomerSerializer, AccountSerializer, LocationSerializer, TransactionSerializer, CardSerializer, LoanSerializer, CardTypeSerializer

class TransaccionesPorClienteViewSet(viewsets.ViewSet):
    """
    ViewSet para obtener el conteo de transacciones por cliente.
    """
    def list(self, request):
        # Agrupar las transacciones por cliente y contar cuántas hay de cada uno
        transacciones_data = Transaction.objects.values('cuenta__cliente__nombre').annotate(
            total_transacciones=Count('id'),  # Conteo de transacciones
            total_monto=Sum('monto')  # Suma de los montos de las transacciones
        )
        
        # Estructurar los datos en una lista de diccionarios
        transacciones_data = [
            {
                'cliente': item['cuenta__cliente__nombre'],
                'total_transacciones': item['total_transacciones'],
                'total_monto': item['total_monto']
            } 
            for item in transacciones_data
        ]
        
        return Response(transacciones_data)


class TarjetasPorTipoViewSet(viewsets.ViewSet):
    """
    ViewSet para obtener el conteo de tarjetas agrupadas por tipo.
    """
    def list(self, request):
        # Agrupar las tarjetas por tipo y contar cuántas hay de cada una
        tarjetas_data = Card.objects.values('tipo_tarjeta__nombre').annotate(count=Count('id'))
        # Estructurar los datos en una lista de diccionarios
        tarjetas_data = [{'tipo_tarjeta': item['tipo_tarjeta__nombre'], 'cantidad': item['count']} for item in tarjetas_data]
        return Response(tarjetas_data)

class ClientesCandidatosBlackViewSet(viewsets.ViewSet):
    def list(self, request):
        cuentas_candidatas = Account.objects.filter(saldo__gt=100000)
        clientes = [{'nombre': cuenta.cliente.nombre, 'saldo': cuenta.saldo} for cuenta in cuentas_candidatas]
        return Response(clientes)


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
    queryset = Account.objects.select_related('cliente').all()  # Optimiza las consultas con select_related
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
class CardTypeViewSet(viewsets.ModelViewSet):
    queryset = CardType.objects.all()
    serializer_class = CardTypeSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
