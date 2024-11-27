from django.contrib.auth.backends import BaseBackend
from users.models import User

class EmailAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Buscamos el usuario usando el correo electrónico (username se refiere al correo)
            user = User.objects.get(email=username)
            if user.check_password(password):  # Verifica la contraseña
                return user
        except User.DoesNotExist:
            return None
