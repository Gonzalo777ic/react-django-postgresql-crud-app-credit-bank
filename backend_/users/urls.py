from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomersViewSet, LoginView
from .views import AccountViewSet, CustomersViewSet, LocationViewSet, TransactionViewSet, CardViewSet, LoanViewSet  # Asegúrate de importar correctamente todos los ViewSets

 
# Configura el router para los ViewSets
router = DefaultRouter()
router.register(r'customers', CustomersViewSet, basename='customers')
router.register(r'accounts', AccountViewSet, basename='accounts')
router.register(r'locations', LocationViewSet, basename='locations')
router.register(r'transactions', TransactionViewSet, basename='transactions')
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'loans', LoanViewSet, basename='loans')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),  # Incluye las rutas generadas automáticamente para customers
]
