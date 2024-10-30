from django.db import models

CATEGORY_CHOICES = [
    ('corruption', 'Corruption'),
    ('embezzlement', 'Embezzlement'),
    ('infrastructure', 'Infrastructure'),
    ('education', 'Education'),
    ('crime', 'Crime'),
    ('violence', 'Violence'),
    ('housing', 'Housing'),
    ('business', 'Business'),
    ('pension', 'Pension'),
    ('health', 'Health'),
    ('security', 'Security'),
    ('environment', 'Environment'),
    ('transport', 'Transport'),
    
]

COUNTY_CHOICES = [
    ('Nairobi', 'Nairobi'),
    ('Mombasa', 'Mombasa'),
    ('Migori', 'Migori'),
    ('Kisumu', 'Kisumu'),
    ('Nakuru', 'Nakuru'),
    ('Nyeri', 'Nyeri'),
    ('Kakamega', 'Kakamega'),
    ('Wajir', 'Wajir'),
    ('Tharaka-Nithi', 'Tharaka-Nithi'),
    ('Machakos', 'Machakos'),
    ('Makueni', 'Makueni'),
    ('Nyandarua', 'Nyandarua'),
    ('West Pokot', 'West Pokot'),
    ('Kirinyaga', 'Kirinyaga'),   
    ('Kiambu', 'Kiambu'),
    ('Turkana', 'Turkana'),
    ('West Nile', 'West Nile'),
    ('Laikipia', 'Laikipia'),
    
    
]

class Feedback(models.Model):
    email = models.EmailField()
    feedback = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    county = models.CharField(max_length=50, choices=COUNTY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    sentiment_score = models.FloatField(null=True, blank=True) 


    def __str__(self):
        return f"Feedback from {self.email} about {self.category} in {self.county}"
    
