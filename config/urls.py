from django.contrib import admin
from django.urls import path, include
from apps.core import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", views.health),
    path("", include("apps.core.urls")),
]
