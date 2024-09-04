from django.shortcuts import render, HttpResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse

# Create your views here.

def home(request):
    tasks = Task.objects.all()
    return render(request, 'base.html', {"tasks": tasks})
  
def new(request):
    return render(request, 'new.html')
  
@csrf_exempt
def toggle_task(request):
    if request.method == "POST":
        data = json.loads(request.body)
        task_id = data.get("id")
        completed = data.get("completed")

        try:
            task = Task.objects.get(id=task_id)
            task.complete = completed
            task.save()
            return JsonResponse({"success": True})
        except Task.DoesNotExist:
            return JsonResponse({"success": False, "error": "Task not found"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    return JsonResponse({"success": False, "error": "Invalid request"})