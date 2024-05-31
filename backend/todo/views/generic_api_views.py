from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from todo.serializers import TodoSerializer
from todo.models import Todo

class TodoListCreateAPIView(generics.ListCreateAPIView):
    queryset=Todo.objects.all()
    serializer_class=TodoSerializer
    
class TodoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer