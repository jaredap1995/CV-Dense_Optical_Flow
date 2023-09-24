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
        path('camera', livefe, name="live_camera"),
        path('api/rep_count', rep_count, name="rep_count"),
        path('sse/', sse_view, name="sse")
    ]