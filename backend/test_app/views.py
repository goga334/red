# import requests
import json

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import User, Group
from .serializers import *


@api_view(['GET', 'POST'])
def list(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        if 'user' in request.path:
            requestObjects = User.objects.all()
        else:
            requestObjects = Group.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(requestObjects, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        if 'user' in request.path:
            serializer = UserSerializer(data,context={'request': request} ,many=True)
        else:
            serializer = GroupSerializer(data,context={'request': request} ,many=True)

        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 
                        'count': paginator.count,
                        'numpages' : paginator.num_pages, 
                        'nextlink': f'{request.path}?page={str(nextPage)}', 
                        'prevlink': f'{request.path}?page={str(previousPage)}'})

    elif request.method == 'POST':
        if json.loads(request.body)['find'] == 1:
            try:
                print(json.loads(request.body)['value'])
                if User.objects.filter(group=json.loads(request.body)['value']):
                    return Response('There is at least one')
                else:
                    return Response('')
            except User.DoesNotExist or Group.DoesNotExist:
                return Response('')

        else:
            if 'user' in request.path:
                serializer = UserSerializer(data=request.data)
            else:
                serializer = GroupSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def detail(request, pk):

    try:
        if 'user' in request.path:
            obj = User.objects.get(pk=pk)
        else:
            obj = Group.objects.get(pk=pk)
    except User.DoesNotExist or Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        if 'user' in request.path:
            serializer = UserSerializer(obj,context={'request': request})
        else:
            serializer = GroupSerializer(obj,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        if 'user' in request.path:
            serializer = UserSerializer(obj, data=request.data,context={'request': request})
        else:
            serializer = GroupSerializer(obj, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
