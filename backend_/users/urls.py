from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomersViewSet, LoginView, ClientesCandidatosBlackViewSet, AccountViewSet, LocationViewSet, TransactionViewSet, CardViewSet, LoanViewSet, CardTypeViewSet, TarjetasPorTipoViewSet, TransaccionesPorClienteViewSet

# Configuración del router
router = DefaultRouter()
router.register(r'customers', CustomersViewSet, basename='customers')
router.register(r'accounts', AccountViewSet, basename='accounts')  # Asegúrate de que esta línea esté incluida
router.register(r'locations', LocationViewSet, basename='locations')
router.register(r'transactions', TransactionViewSet, basename='transactions')
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'loans', LoanViewSet, basename='loans')
router.register(r'card-types', CardTypeViewSet, basename='card-types')  # Agrega esta línea

# Registra la vista ClientesCandidatosBlackViewSet
router.register(r'clientes-candidatos-black', ClientesCandidatosBlackViewSet, basename='clientes-candidatos-black')
router.register(r'tarjetas-por-tipo', TarjetasPorTipoViewSet, basename='tarjetas-por-tipo')
router.register(r'transacciones-por-cliente', TransaccionesPorClienteViewSet, basename='transacciones-por-cliente')



urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),  # Incluye las rutas generadas automáticamente para los viewsets

]
