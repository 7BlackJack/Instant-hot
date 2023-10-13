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
    result = api.get_getrankhistory_name(text)
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def time_id(request, timestamp):
    api = WeiboAPI()
    result = api.get_time_id(timestamp)
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def time_id_by_name(request, name):
    api = WeiboAPI()
    result = api.get_timeid_byname(name)
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def all_data_list(request, time_id):
    api = WeiboAPI()
    result = api.get_all_data_list(time_id)
    return Response(result, status=status.HTTP_200_OK)
