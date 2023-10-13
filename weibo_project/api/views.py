from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..weibo_api.weibo_api import WeiboAPI # 引入你的WeiboAPI类

@api_view(['GET'])
def search_list(request, query):
    api = WeiboAPI()
    result = api.get_search_list(query)
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def rank_history(request, text):
    api = WeiboAPI()
    result = api.get_rank_history(text)
    return Response(result, status=status.HTTP_200_OK)

# 你可以添加更多的视图函数，用于调用WeiboAPI的其他方法
