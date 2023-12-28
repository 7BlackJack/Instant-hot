from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging
from weibo_api.weibo_api import WeiboAPI
from fanyi_api.fanyi_api import Translator
import json

# 初始化日志
logger = logging.getLogger(__name__)

# 初始化WeiboAPI
api = WeiboAPI()

# 初始化 Translator 实例
translator = Translator()


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
        parsed_result = json.loads(result)
        print(parsed_result)
        # logger.info(f"对查询 {query} 的搜索列表结果：{parsed_result}")
        return JsonResponse({"data": parsed_result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"发生错误：{str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def rank_history(request, text):
    """
    根据关键字字符串查看该关键字所有的详细排名的历史
    :param request:
    :param text: 挖呀挖黄老师5场直播销售额超百万
    :return:
    """
    try:
        result = api.get_rank_history(text)
        print(result)
        return JsonResponse({"data": result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def time_id(request, timestamp):
    """
    根据时间日期，得到该瞬间的时间time_id
    :param request:
    :param timestamp: 2023-10-06 09:20:10
    :return:
    """
    try:
        result = api.get_time_id(timestamp)
        return JsonResponse({"data": result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def time_id_by_name(request, name):
    """
    根据热点关键字获取热点时间的ID
    :param request:
    :param name: gidle英文首专
    :return:
    """
    try:
        result = api.get_time_id_by_name(name)
        return JsonResponse({"data": result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def all_data_list(request, time_id):
    """
    根据时间ID 获取对应的所有热点数据列表，最多【50】
    :param request:
        :param time_id: 1005358
    :return:
    """
    try:
        print(time_id)
        result = api.get_all_data_list(time_id)
        print(result)
        return JsonResponse({"data": result}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def translate(request):
    try:
        # 从 POST 请求的 body 中获取 text
        query = request.data.get('text')
        # 使用翻译器翻译查询字符串
        translated_query = translator.translate(query)
        # 解析字符串化的 JSON 对象
        translated_data = json.loads(translated_query)
        return JsonResponse(translated_data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"发生错误：{str(e)}")
        return Response({"error": "An issue occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
