# 🏗️ Build-Dokumentation: Gasthaus Riffer

**Erstellt:** 02.06.2026 04:10  
**Stadt:** Alsfeld  
**Branche:** Restaurant  
**Projekt-Typ:** 📄 Landing Page  
**Score:** 95/100  
**Einnahmen-Potenzial:** 350–500€  
**Build-Runden:** 5  

---

## Referenz-Projekt
- Kopiert von: `hg-fluegel`
- Typ: landing

## Digitale Ausgangslage
- Website vorhanden: ❌ Keine
- Mobile-optimiert: ❌
- Bilder: ❌
- Social Media: ❌
- Verbesserungspunkte:
  - 🏪 Restaurant — lokaler Betrieb
  - ❌ Keine Website — maximales Potenzial
  - 📞 Nur telefonisch erreichbar — braucht Web!

## Build-Runden
- **Runde 1:** Architektur, Models, Views, Templates, SEO, Security, Deploy-Config
- **Runde 2:** Code-Review + kritische Fixes
- **Runde 3:** SEO-Vertiefung + Performance
- **Runde 4:** Conversion-Optimierung + Security-Hardening
- **Runde 5:** Finaler Check + Deployment-Verifikation

## Lokale Entwicklung
```bash
cd gasthaus_riffer
pip install -r requirements.txt
cp .env.example .env  # Werte eintragen!
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Pflicht-ENV-Vars
```
SECRET_KEY=  # bereits gesetzt
DEBUG=False  # bereits gesetzt
CONTACT_EMAIL=info@gasthaus-riffer.de
RESEND_API_KEY=  # resend.com → kostenloses Konto
PGDATABASE=  # Neon.tech DB
PGUSER=
PGPASSWORD=
PGHOST=
```


## Nächste Schritte
1. ENV-Vars im Railway-Dashboard befüllen
2. Echte Firmenbilder hochladen
3. Texte + Öffnungszeiten anpassen
4. Google Search Console einrichten
5. Kunde übergeben 💰

---
*Gebaut von Django Dream Team 🤖 — github.com/django-dream-team*