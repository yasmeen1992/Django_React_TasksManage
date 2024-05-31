from rest_framework.response import Response
from rest_framework.decorators import api_view
from todo.serializers import TodoSerializer
from todo.models import Todo
from rest_framework import status
from django.shortcuts import get_object_or_404



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def todo_view(request, pk=None):
    if request.method == 'GET':
        if pk:
            # If a primary key (pk) is provided, retrieve a single Todo item
            todo = get_object_or_404(Todo, pk=pk)
            serializer = TodoSerializer(todo)
        else:
            # If no pk, retrieve all Todo items
            todos = Todo.objects.all()
            serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BADRED_REQUEST)

    elif request.method == 'PUT':
        # For PUT, a pk must be provided
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # For DELETE, a pk must be provided
        todo = get_object_or_404(Todo, pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
   
    