# backend_/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lambda request: HttpResponse("Bienvenido al backend")),
    path('users/', include('users.urls')),  # Incluir las URLs de la app 'users'
    path('api/', include('users.urls')),  # Incluye las URLs de la app 'users'
    
]
