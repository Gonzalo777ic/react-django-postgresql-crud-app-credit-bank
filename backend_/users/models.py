from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # Redefinimos el email como único
    rol = models.CharField(max_length=50, choices=[('admin', 'Admin'), ('employee', 'Employee')])
    fecha_registro = models.DateTimeField(auto_now_add=True)  # Fecha de registro, con valor por defecto

    def __str__(self):
        return self.email

class Customers(models.Model):
    # id es agregado automáticamente por Django como un campo AutoField
    fecha_registro = models.DateTimeField(auto_now_add=True, null=True)  # Similar a timestamp en la tabla
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    telefono = models.CharField(max_length=100, blank=True, null=True)  # Correspondiente al campo 'telephone'
    direccion = models.CharField(max_length=255, blank=True, null=True)  # Correspondiente al campo 'address'

    class Meta:
        db_table = 'customers'  # Asegúrate de que la tabla en la base de datos se llama 'customers'

    def __str__(self):
        return self.name

class Account(models.Model):
    cliente = models.ForeignKey(Customers, on_delete=models.CASCADE)  # Relación con la tabla Customer
    tipo_cuenta = models.CharField(max_length=50)
    saldo = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=50, default='activa')

    class Meta:
        db_table = 'accounts'  # Asegúrate de que la tabla en la base de datos se llama 'accounts'
        
    def __str__(self):
        return f'{self.tipo_cuenta} - {self.cliente.nombre}'
    
class Location(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    tipo = models.CharField(max_length=50)

    class Meta:
        db_table = 'locations'  # Asegúrate de que la tabla en la base de datos se llama 'locations'
        
    def __str__(self):
        return self.nombre
    
    

class Transaction(models.Model):
    cuenta = models.ForeignKey(Account, on_delete=models.CASCADE)  # Relación con la tabla Account
    tipo = models.CharField(max_length=50)
    monto = models.DecimalField(max_digits=15, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True)  # Relación con la tabla Location

    class Meta:
        db_table = 'transactions'  # Asegúrate de que la tabla en la base de datos se llama 'transactions'
        
    def __str__(self):
        return f'{self.tipo} - {self.monto} - {self.cuenta}'

class CardType(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    # Otros atributos adicionales, como tarifas o beneficios
    tarifa_anual = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    # Puedes agregar más atributos según el tipo de tarjeta

    class Meta:
        db_table = 'card_types'

    def __str__(self):
        return self.nombre

class Card(models.Model):
    cuenta = models.ForeignKey(Account, on_delete=models.CASCADE)  # Relación con la tabla Account
    numero_tarjeta = models.CharField(max_length=16, unique=True)
    tipo_tarjeta = models.ForeignKey(CardType, on_delete=models.CASCADE)  # Relación con CardType
    fecha_expiracion = models.DateField()
    codigo_seguridad = models.CharField(max_length=3)
    estado = models.CharField(max_length=50, default='activa')
    
    class Meta:
        db_table = 'cards'

    def __str__(self):
        return f'{self.tipo_tarjeta.nombre} - {self.numero_tarjeta}'
    


class Loan(models.Model):
    cliente = models.ForeignKey(Customers, on_delete=models.CASCADE)  # Relación con la tabla Customer
    monto_prestamo = models.DecimalField(max_digits=15, decimal_places=2)
    tasa_interes = models.DecimalField(max_digits=5, decimal_places=2)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_finalizacion = models.DateTimeField(null=True, blank=True)
    estado = models.CharField(max_length=50, default='activo')

    class Meta:
        db_table = 'loans'  # Asegúrate de que la tabla en la base de datos se llama 'loans'

    def __str__(self):
        return f'{self.monto_prestamo} - {self.cliente.nombre}'