from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from todo.views import (todo_view,TodoAPIView,TodoListCreateAPIView
,TodoRetrieveUpdateDestroyAPIView,TodoViewSet,TodoModelViewSet)

todo_list=TodoViewSet.as_view({
    'get':'list',
    'post': 'create'
})
todo_detail=TodoViewSet.as_view({
     'get':'retrieve',
     'put': 'update',
     'patch': 'partial_update',
     'delete': 'destroy'
})
""" todo_list_modelvs=TodoModelViewSet.as_view({
    'get':'list',
     'post': 'create'
})
todo_detail_modelvs=TodoModelViewSet.as_view({
    'get':'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
}) """

router = DefaultRouter()
router.register(r'model_viewset/tasks', TodoModelViewSet, basename='todo')

urlpatterns = [
    path('tasks/', todo_view),
    path('tasks/<int:pk>/', todo_view, name='task-detail'),
    path('apiviews/tasks',TodoAPIView.as_view()),
    path('apiviews/tasks/<int:pk>/', TodoAPIView.as_view()),
    path('generics/tasks',TodoListCreateAPIView.as_view()),
    path('generics/tasks/<int:pk>/', TodoRetrieveUpdateDestroyAPIView.as_view(), name='todo-retrieve-update-destroy'),
    path('viewset/tasks/',todo_list, name='todo_list'),
    path('viewset/tasks/<int:pk>/', todo_detail, name='todo_detail'),
     path('', include(router.urls)),
    # path('model_viewset/tasks/',todo_list_modelvs),
    # path('model_viewset/tasks/<int:pk>/', todo_detail_modelvs),


]