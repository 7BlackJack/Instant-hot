from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password, check_password


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = make_password(data.get('password'))
        # 可以添加更多数据验证
        User.objects.create(username=username, password=password)
        return JsonResponse({
            'code': 0,
            'message': 'User registered successfully'
        })
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = User.objects.filter(username=username).first()
        if user and check_password(password, user.password):
            return JsonResponse({
                "code": 0,
                'message': 'Login successful'
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)


def user_info(request, username):
    """
        获取用户信息
    """
    if request.method == 'GET':
        user = User.objects.filter(username=username).first()
        if user:
            user_data = {
                'username': user.username,
                'registration_date': user.registration_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            return JsonResponse({'user': user_data})
        else:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
