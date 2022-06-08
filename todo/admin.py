from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Todo

# Register your models here.

admin.site.unregister(Group)
admin.site.register(Todo)
