from django.db import models

class Kontakt(models.Model):
    name    = models.CharField(max_length=100)
    email   = models.EmailField()
    nachricht = models.TextField()
    erstellt  = models.DateTimeField(auto_now_add=True)
    gelesen   = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.email})"
