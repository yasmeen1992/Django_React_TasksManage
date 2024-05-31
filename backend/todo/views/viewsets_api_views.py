from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from todo.serializers import TodoSerializer
from todo.models import Todo

class TodoViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Todo.objects.all()
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def update(self, request, pk=None):
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        todo = get_object_or_404(Todo, pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class TodoModelViewSet(viewsets.ModelViewSet):
    serializer_class=TodoSerializer
    queryset=Todo.objects.all()