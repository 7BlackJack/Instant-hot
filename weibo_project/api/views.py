from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging
from weibo_api.weibo_api import WeiboAPI

# 初始化日志
logger = logging.getLogger(__name__)

# 初始化WeiboAPI
api = WeiboAPI()


@api_view(['GET'])
def search_list(request, query):
    """
    Header 的搜索框，实时查询
    :param request:
    :param query: 搜索查询的字符串
    :return: 返回相关查询字符串基于正则匹配的热点关键字列表
    """
    try:
        result = api.get_search_list(query)
        logger.info(f"对查询 {query} 的搜索列表结果：{result}")
        return JsonResponse({"data": result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"发生错误：{str(e)}")
        return Response({"error": "出了点问题"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def rank_history(request, text):
    """
    根据关键字字符串查看该关键字所有的详细排名的历史
    :param request:
    :param text: 挖呀挖黄老师5场直播销售额超百万
    :return:
    """
    result = api.get_rank_history(text)
    return JsonResponse({"data": result})

@api_view(['GET'])
def time_id(request, timestamp):
    """
    根据时间日期，得到该瞬间的时间time_id
    :param request:
    :param timestamp: 2023-10-06 09:20:10
    :return:
    """
    result = api.get_time_id(timestamp)
    return JsonResponse({"data": result})

@api_view(['GET'])
def time_id_by_name(request, name):
    """
    根据热点关键字获取热点时间的ID
    :param request:
    :param name: gidle英文首专
    :return:
    """
    result = api.get_time_id_by_name(name)
    return JsonResponse({"data": result})

@api_view(['GET'])
def all_data_list(request, time_id):
    """
    根据时间ID 获取对应的所有热点数据列表，最多【50】
    :param request:
    :param time_id: 1005358
    :return:
    """
    result = api.get_all_data_list(time_id)
    return JsonResponse({"data": result})