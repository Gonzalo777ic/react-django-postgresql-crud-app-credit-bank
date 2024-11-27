from rest_framework import serializers
from .models import Customers
from .models import User  # Asegúrate de que esta línea está presente
from .models import Customers, Account, Location, Transaction, Card, Loan


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nombre', 'rol']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'
# Serializer para Account
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

# Serializer para Location
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

# Serializer para Transaction
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

# Serializer para Card
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

# Serializer para Loan
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'