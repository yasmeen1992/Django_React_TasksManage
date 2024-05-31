from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from todo.serializers import TodoSerializer
from todo.models import Todo
class TodoAPIView(APIView):
    def get(self,request, pk=None):
        if pk:
            # If a primary key (pk) is provided, retrieve a single Todo item
            todo = get_object_or_404(Todo, pk=pk)
            serializer = TodoSerializer(todo)
        else:
            # If no pk, retrieve all Todo items
            todos = Todo.objects.all()
            serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    def post(self,request,*args,**kwargs):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BADRED_REQUEST)
    def put(self, request, pk, *args, **kwargs):
        # Retrieve the existing Todo item by its primary key
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        # Retrieve the existing Todo item by its primary key
        todo = get_object_or_404(Todo, pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    