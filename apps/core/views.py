from django.shortcuts import render, redirect
from django.http import JsonResponse

def index(request):
    return render(request, "base.html", {"page": "home"})

def kontakt(request):
    if request.method == "POST":
        if request.POST.get("website"):
            return redirect("core:index")
        from .models import Kontakt
        Kontakt.objects.create(
            name=request.POST.get("name","")[:100],
            email=request.POST.get("email","")[:254],
            nachricht=request.POST.get("nachricht","")[:2000],
        )
        return redirect("core:danke")
    return render(request, "core/contact.html", {"page": "kontakt"})

def danke(request):
    return render(request, "base.html", {"page": "danke", "msg": "Vielen Dank!"})

def impressum(request):
    return render(request, "core/impressum.html", {"page": "impressum"})

def datenschutz(request):
    return render(request, "core/datenschutz.html", {"page": "datenschutz"})

def health(request):
    # Kein ALLOWED_HOSTS-Check hier — immer 200
    return JsonResponse({"status": "ok", "service": "online"})
