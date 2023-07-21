from django.shortcuts import render
from myapp.camera import VideoCamera #MaskDetect, LiveWebCam
from django.http import StreamingHttpResponse
from .camera import *
from django.http import Http404

# @gzip.gzip_page
def livefe(request):
    try:
        cam = VideoCamera()
        time.sleep(1)  # Allow the get_frame thread to start
        
        return StreamingHttpResponse(gen(request, cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  
        raise Http404("Couldn't open camera.")

def index(request, *args, **kwargs):
    return render(request, 'home.html')
