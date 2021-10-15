"""red URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from test_app import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/user/$', views.list),
    url(r'^api/user_add/(?P<pk>[0-9]+)$', views.detail),
    url(r'^api/group/$', views.list),
    url(r'^api/group_add/(?P<pk>[0-9]+)$', views.detail),
]
