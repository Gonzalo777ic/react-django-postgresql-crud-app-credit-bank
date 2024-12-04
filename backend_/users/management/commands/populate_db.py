from django.core.management.base import BaseCommand
from users.models import User, Customers, Account, Location, Transaction, Card, Loan
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **kwargs):
        # Create Customers
        customer1 = Customers.objects.create(nombre='John Doe', email='john@example.com', telefono='1234567890', direccion='123 Main St')
        customer2 = Customers.objects.create(nombre='Jane Smith', email='jane@example.com', telefono='0987654321', direccion='456 Elm St')

        # Create Accounts
        account1 = Account.objects.create(cliente=customer1, tipo_cuenta='savings', saldo=1000.00)
        account2 = Account.objects.create(cliente=customer2, tipo_cuenta='checking', saldo=500.00)

        # Create Locations
        location1 = Location.objects.create(nombre='ATM 1', direccion='789 Oak St', tipo='ATM')
        location2 = Location.objects.create(nombre='App', tipo='app')

        # Create Transactions
        transaction1 = Transaction.objects.create(cuenta=account1, tipo='deposit', monto=200.00, location=location1)
        transaction2 = Transaction.objects.create(cuenta=account2, tipo='withdrawal', monto=50.00, location=location2)

        # Create Cards
        card1 = Card.objects.create(cuenta=account1, numero_tarjeta='1234567812345678', tipo_tarjeta='debit', fecha_expiracion=timezone.now().date(), codigo_seguridad='123')
        card2 = Card.objects.create(cuenta=account2, numero_tarjeta='8765432187654321', tipo_tarjeta='credit', fecha_expiracion=timezone.now().date(), codigo_seguridad='321')

        # Create Loans
        loan1 = Loan.objects.create(cliente=customer1, monto_prestamo=5000.00, tasa_interes=5.00)
        loan2 = Loan.objects.create(cliente=customer2, monto_prestamo=10000.00, tasa_interes=4.50)

        self.stdout.write(self.style.SUCCESS('Database populated with sample data'))