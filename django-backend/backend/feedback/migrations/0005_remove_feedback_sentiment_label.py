# Generated by Django 5.1.2 on 2024-10-19 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0004_feedback_sentiment_label_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='sentiment_label',
        ),
    ]