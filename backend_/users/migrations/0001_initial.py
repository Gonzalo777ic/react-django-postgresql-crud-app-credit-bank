# Generated by Django 4.2.16 on 2024-11-19 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_registro', models.DateTimeField(auto_now_add=True, null=True)),
                ('nombre', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('telefono', models.CharField(blank=True, max_length=100, null=True)),
                ('direccion', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'customers',
            },
        ),
    ]