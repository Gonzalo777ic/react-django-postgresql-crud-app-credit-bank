from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from users.models import User  # Importa tu modelo de usuario personalizado
from .models import Customers, Account, Location, Transaction, Card, Loan

class CustomUserCreationForm(forms.ModelForm):
    """
    Formulario para crear nuevos usuarios en el Django Admin.
    """
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'rol', 'is_active', 'is_staff')

    def save(self, commit=True):
        # Usa `set_password` para cifrar la contraseña
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class CustomUserAdmin(UserAdmin):
    """
    Configuración personalizada del Django Admin para el modelo de usuario.
    """
    add_form = CustomUserCreationForm
    model = User
    list_display = ('email', 'first_name', 'last_name', 'rol', 'is_active', 'is_staff')
    ordering = ('email',)
    search_fields = ('email', 'first_name', 'last_name')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'rol')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name', 'rol', 'is_active', 'is_staff')},
        ),
    )

# Registra el modelo de usuario con la configuración personalizada
admin.site.register(User, CustomUserAdmin)


# Personalización del modelo Customers
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'telefono', 'direccion', 'fecha_registro')
    search_fields = ('nombre', 'email')
    list_filter = ('fecha_registro',)
    
admin.site.register(Customers, CustomerAdmin)

# Personalización del modelo Account
class AccountAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'tipo_cuenta', 'saldo', 'fecha_creacion', 'estado')
    search_fields = ('cliente__nombre', 'tipo_cuenta')
    list_filter = ('estado', 'fecha_creacion')
    
admin.site.register(Account, AccountAdmin)

# Personalización del modelo Location
class LocationAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'direccion', 'tipo')
    search_fields = ('nombre', 'direccion')
    list_filter = ('tipo',)
    
admin.site.register(Location, LocationAdmin)

# Personalización del modelo Transaction
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('cuenta', 'tipo', 'monto', 'fecha', 'location')
    search_fields = ('cuenta__cliente__nombre', 'tipo', 'descripcion')
    list_filter = ('tipo', 'fecha')
    
admin.site.register(Transaction, TransactionAdmin)

# Personalización del modelo Card
class CardAdmin(admin.ModelAdmin):
    list_display = ('cuenta', 'numero_tarjeta', 'tipo_tarjeta', 'fecha_expiracion', 'estado')
    search_fields = ('numero_tarjeta', 'tipo_tarjeta')
    list_filter = ('estado',)
    
admin.site.register(Card, CardAdmin)

# Personalización del modelo Loan
class LoanAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'monto_prestamo', 'tasa_interes', 'fecha_inicio', 'estado')
    search_fields = ('cliente__nombre', 'monto_prestamo')
    list_filter = ('estado', 'fecha_inicio')
    
admin.site.register(Loan, LoanAdmin)