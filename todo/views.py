from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateAPIView(APIView):

    def get(self, request):
        todos = Todo.objects.filter(author=request.user)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)


class TodoDetailUpdateDeleteAPIView(APIView):

    def get(self, request, pk):
        todo = Todo.objects.filter(pk=pk).filter(author=request.user).first()
        if todo:
            serializer = TodoSerializer(todo)
            return Response(serializer.data)
        return Response(status=404)

    def put(self, request, pk):
        todo = Todo.objects.filter(pk=pk).filter(author=request.user).first()
        if todo is not None:
            serializer = TodoSerializer(todo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        return Response(status=404)

    def delete(self, request, pk):
        todo = Todo.objects.filter(pk=pk).filter(author=request.user).first()
        if todo:
            todo.delete()
            return Response(status=204)
        return Response(status=404)
