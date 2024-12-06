# By juma samwel
from django.contrib import admin
from .models import Feedback

# Register the Feedback model
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('email', 'feedback', 'category', 'county', 'created_at', 'sentiment_score', 'sentiment_label') # Customize the displayed columns
    list_filter = ('category', 'county', 'created_at')  # Optional: Allows filtering by date
 