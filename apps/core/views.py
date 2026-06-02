from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Kontakt

def index(request):
    return render(request, "base.html", {"page": "home"})

def kontakt(request):
    if request.method == "POST":
        if request.POST.get("website"):   # Honeypot
            return redirect("core:index")
        Kontakt.objects.create(
            name=request.POST.get("name","")[:100],
            email=request.POST.get("email","")[:254],
            nachricht=request.POST.get("nachricht","")[:2000],
        )
        return redirect("core:danke")
    return render(request, "core/contact.html", {"page": "kontakt"})

def danke(request):
    return render(request, "base.html", {"page": "danke", "msg": "Vielen Dank! Wir melden uns."})

def impressum(request):
    return render(request, "core/impressum.html", {"page": "impressum"})

def datenschutz(request):
    return render(request, "core/datenschutz.html", {"page": "datenschutz"})

def health(request):
    return JsonResponse({"status": "ok"})
