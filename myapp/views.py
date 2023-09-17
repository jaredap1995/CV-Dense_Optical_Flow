from django.shortcuts import render
from myapp.camera import VideoCamera 
from django.http import StreamingHttpResponse
from .camera import *
from django.http import Http404
from django.http import JsonResponse

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


def rep_count(request):
    try:
        time.sleep(1)
        print('hello')
        rep = cam.fetch_reps()
        print(rep)
        return JsonResponse({'rep_count': rep})
    except:
        raise Http404('Error fetching rep count')

