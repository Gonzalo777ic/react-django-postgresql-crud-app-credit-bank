import random
from django.core.management.base import BaseCommand
from users.models import Customers, Account, Location, Transaction, Card, Loan, CardType
from django.utils import timezone

class Command(BaseCommand):
    help = 'Inserta clientes con saldo aleatorio y tarjetas asociadas'

    def handle(self, *args, **kwargs):
        # Crear tipos de tarjeta
        card_types = [
            {'nombre': 'Débito Básica', 'descripcion': 'Tarjeta de débito estándar', 'tarifa_anual': 20.00},
            {'nombre': 'Débito Preferente', 'descripcion': 'Tarjeta de débito con beneficios adicionales', 'tarifa_anual': 50.00},
            {'nombre': 'Débito Black', 'descripcion': 'Tarjeta de débito elite con beneficios exclusivos', 'tarifa_anual': 200.00},
            {'nombre': 'Crédito Básica', 'descripcion': 'Tarjeta de crédito estándar', 'tarifa_anual': 30.00},
            {'nombre': 'Crédito Oro', 'descripcion': 'Tarjeta de crédito con beneficios premium', 'tarifa_anual': 100.00},
            {'nombre': 'Crédito Platino', 'descripcion': 'Tarjeta de crédito de gama alta', 'tarifa_anual': 300.00},
            {'nombre': 'Crédito Black', 'descripcion': 'Tarjeta de crédito elite', 'tarifa_anual': 500.00}
        ]

        # Crear los tipos de tarjeta en la base de datos
        for card_type in card_types:
            CardType.objects.create(**card_type)

        # Crear Clientes
        for i in range(1, 21):  # Crear 20 clientes
            customer = Customers.objects.create(
                nombre=f'Cliente {i}',
                email=f'cliente{i}@example.com',
                telefono=f'555-{1000000 + i}',
                direccion=f'Calle {i} #100',
            )

            # Crear Cuentas con saldos aleatorios entre 50,000 y 250,000
            saldo_aleatorio = round(random.uniform(50000.00, 250000.00), 2)
            account = Account.objects.create(
                cliente=customer,
                tipo_cuenta='savings',
                saldo=saldo_aleatorio,
            )

            # Crear Locations
            location = Location.objects.create(
                nombre=f'ATM {i}',
                direccion=f'Calle {i} #100',
                tipo='ATM',
            )

            # Crear Transactions asociadas a las cuentas
            transaction = Transaction.objects.create(
                cuenta=account,
                tipo='deposit',
                monto=200.00,
                location=location,
            )

            # Crear CardType para el cliente (Usamos tarjetas aleatorias)
            card_type = CardType.objects.all().order_by('?').first()  # Selecciona un tipo de tarjeta aleatorio

            # Crear Cards asociadas a las cuentas
            card = Card.objects.create(
                cuenta=account,
                numero_tarjeta=f'{1000000000000000 + i}',
                tipo_tarjeta=card_type,
                fecha_expiracion=timezone.now().date(),
                codigo_seguridad='123',
            )

            # Crear Loans para los clientes
            loan = Loan.objects.create(
                cliente=customer,
                monto_prestamo=5000.00 + (i * 1000),  # Aumento el monto del préstamo de forma incremental
                tasa_interes=5.00 + (i * 0.05),
            )

        self.stdout.write(self.style.SUCCESS('20 clientes y sus relaciones insertados correctamente'))
