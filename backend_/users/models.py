from django.db import models

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
