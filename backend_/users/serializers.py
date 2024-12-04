from .models import Customers
from .models import User  # Asegúrate de que esta línea está presente
from .models import Customers, Account, Location, Transaction, Card, Loan, CardType
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nombre', 'rol']

# Serializer para Transaction
class TransactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transaction
        fields = ['id', 'cuenta', 'tipo', 'monto', 'fecha', 'descripcion', 'location']  # Campos específicos

class CardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardType
        fields = ['id', 'nombre', 'descripcion', 'tarifa_anual']

# Agrega los otros serializers según sea necesario, por ejemplo:
class CardSerializer(serializers.ModelSerializer):
    tipo_tarjeta = CardTypeSerializer()  # Incluir el serializer de CardType en Card

    class Meta:
        model = Card
        fields = ['id', 'numero_tarjeta', 'tipo_tarjeta', 'fecha_expiracion', 'codigo_seguridad', 'estado']  # Campos específicos

# Serializer para Loan
class LoanSerializer(serializers.ModelSerializer):

    customer = serializers.StringRelatedField()  # Devuelve el nombre del cliente o una representación simple

    class Meta:
        model = Loan
        fields = ['id', 'customer', 'monto_prestamo', 'tasa_interes', 'fecha_inicio', 'fecha_finalizacion', 'estado']
        
# Serializer para Location
class LocationSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()  # Devuelve el nombre del cliente o una representación simple

    class Meta:
        model = Location
        fields = ['id', 'nombre', 'direccion', 'tipo', 'customer']  # Campos específicos
        
class AccountSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()  # Devuelve el nombre del cliente o una representación simple

    class Meta:
        model = Account
        fields = ['id', 'tipo_cuenta', 'saldo', 'estado', 'fecha_creacion', 'customer']
        
# Serializador de Customer
class CustomerSerializer(serializers.ModelSerializer):
    cuentas = AccountSerializer(many=True, read_only=True, source='account_set')  # Relaciona las cuentas del cliente
    transacciones = TransactionSerializer(many=True, read_only=True, source='account_set__transaction_set')  # Relaciona las transacciones
    tarjetas = CardSerializer(many=True, read_only=True, source='account_set__card_set')  # Relaciona las tarjetas
    prestamos = LoanSerializer(many=True, read_only=True, source='loan_set')  # Relaciona los préstamos

    class Meta:
        model = Customers
        fields = ['id', 'nombre', 'email', 'telefono', 'direccion', 'fecha_registro', 'cuentas', 'transacciones', 'tarjetas', 'prestamos']
