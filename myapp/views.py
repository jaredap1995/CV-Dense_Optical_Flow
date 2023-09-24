from django.shortcuts import render
from myapp.camera import VideoCamera 
from django.http import StreamingHttpResponse
from .camera import *
from django.http import Http404
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
import asyncio
import datetime

cam = VideoCamera()

# @gzip.gzip_page
def livefe(request):
    try:
        time.sleep(1)  # Allow the get_frame thread to start
        return StreamingHttpResponse(gen(request, cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  
        raise Http404("Couldn't open camera.")


def index(request, *args, **kwargs):
    return render(request, 'home.html')

@api_view(['GET'])
def rep_count(request):
    try:
        time.sleep(1)
        rep = cam.fetch_reps()
        return Response({'rep_count': rep})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
async def sse_view(request):
    def event_stream():
        time.sleep(0.3)
        while True:
            data = {
                'x': datetime.datetime.now().isoformat(),
                'y': cam.fetch_signal().tolist()
            }
            yield f"data: {json.dumps(data)}\n\n"
            time.sleep(0.1)

    response = StreamingHttpResponse(event_stream(), content_type = "text/event-stream")

    response['Access-Control-Allow-Origin'] = '*'
    response['Cache-Control'] = 'no-cache'

    return response