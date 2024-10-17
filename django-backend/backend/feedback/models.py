from django.db import models

CATEGORY_CHOICES = [
    ('corruption', 'Corruption'),
    ('embezzlement', 'Embezzlement'),
    ('infrastructure', 'Infrastructure'),
    ('education', 'Education'),
    # ... add more categories
]

COUNTY_CHOICES = [
    ('Nairobi', 'Nairobi'),
    ('Mombasa', 'Mombasa'),
    ('Migori', 'Migori'),
    # ... add all Kenyan counties
]

class Feedback(models.Model):
    email = models.EmailField()
    feedback = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    county = models.CharField(max_length=50, choices=COUNTY_CHOICES)

    def __str__(self):
        return f"Feedback from {self.email} about {self.category} in {self.county}"
