# from django.urls import path, include
# from myapp import views


# urlpatterns = [
#     path('', views.index, name='index'),
#     path('video_feed', views.video_feed, name='video_feed'),
#     path('webcam_feed', views.webcam_feed, name='webcam_feed'),
#     # path('mask_feed', views.mask_feed, name='mask_feed'),
# 	# path('livecam_feed', views.livecam_feed, name='livecam_feed'),
#     ]

from django.urls import path
from .views import *

urlpatterns = [
    path('', index),

        # 'livefe' -> function from views
        # 'live_camera' -> name at index.html>img src="{% url 'live_camera' %}
        path('/camera', livefe, name="live_camera"),
    ]