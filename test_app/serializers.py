from rest_framework import serializers
from .models import User, Group

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk','username', 'group', 'createdAt')

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ('pk','name','description')
