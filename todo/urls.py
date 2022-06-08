from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.TodoListCreateAPIView.as_view()),
    path('todos/<int:pk>/', views.TodoDetailUpdateDeleteAPIView.as_view()),
]
