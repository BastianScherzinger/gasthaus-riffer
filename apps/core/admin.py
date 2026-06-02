from django.contrib import admin
from .models import Kontakt

@admin.register(Kontakt)
class KontaktAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "erstellt", "gelesen"]
    list_filter  = ["gelesen"]
