from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomersViewSet, LoginView

# Configura el router para el ViewSet
router = DefaultRouter()
router.register(r'customers', CustomersViewSet, basename='customers')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Ruta para el login
    path('', include(router.urls)),  # Incluye las rutas generadas automáticamente para customers
]
