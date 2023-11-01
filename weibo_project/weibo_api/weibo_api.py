import time

import requests
import base64
import json
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


class WeiboAPI:
    # 类级别的常量，方便以后全局修改
    BASE_URL = "https://api.weibotop.cn/"
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    HASH_SECRET = b"tSdGtmwh49BcR1irt18mxG41dGsBuGKS"

    def __init__(self):
        # 初始化请求头
        self.headers = {"user-agent": self.USER_AGENT}
        # 初始化哈希字节
        self.hash_bytes = self.calculate_hash_bytes()

    @staticmethod
    def calculate_hash_bytes():
        """
        计算哈希字节
        :return: 返回32字节的哈希值
        """
        hash_object = hashlib.sha1(WeiboAPI.HASH_SECRET)
        hash_hex = hash_object.hexdigest()[:32]
        return bytes.fromhex(hash_hex)

    def encrypt(self, text):
        """
        加密文本
        :param text: 待加密的明文
        :return: 返回Base64编码的密文
        """
        if text is None:
            return None
        cipher = AES.new(self.hash_bytes, AES.MODE_ECB)
        padded_data = pad(text.encode('utf-8'), AES.block_size)
        encrypted_data = cipher.encrypt(padded_data)
        return base64.b64encode(encrypted_data).decode()

    def decrypt(self, encrypted_text):
        """
        解密文本
        :param encrypted_text: 待解密的Base64编码的密文
        :return: 返回解密后的明文
        """
        encrypted_bytes = base64.b64decode(encrypted_text)
        cipher = AES.new(self.hash_bytes, AES.MODE_ECB)
        decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
        return json.loads(decrypted_bytes.decode('utf-8'))


    def send_request(self, endpoint, params, need_decrypt=True):
        """
        发送加密的API请求
        :param endpoint: API的端点（不含基础URL）
        :param params: API请求参数
        :return: 返回解密后或（未加密原文）的响应数据
        """
        encrypted_params = {k: self.encrypt(v) for k, v in params.items()}
        print(encrypted_params)
        try:
            start = time .time()
            response = requests.get(f"{self.BASE_URL}{endpoint}", headers=self.headers, params=encrypted_params)
            print(f'請求時間: {time.time() - start}')
            response.raise_for_status()
            return self.decrypt(response.text) if need_decrypt else response.text
        except requests.RequestException as e:
            print(f"An error occurred: {e}")
            return None

    def get_search_list(self, query):
        """
        获取搜索列表
        :param query: 搜索查询字符串
        :return: 返回与查询字符串匹配的热点关键词列表
        """
        return self.send_request("search", {"searchstr": query}, need_decrypt=False)

    def get_rank_history(self, text):
        """
        获取排名历史
        :param text: 热点关键词
        :return: 返回指定热点关键词的详细排名历史
        """
        return self.send_request("getrankhistory", {"name": text})

    def get_time_id(self, data):
        """
        获取时间ID
        :param data: 时间戳（格式：2023-09-01T14:58:18）
        :return: 返回最接近的热点时间ID
        """
        return self.send_request("getclosesttime", {"timestamp": data}, need_decrypt=False)

    def get_time_id_by_name(self, name):
        """
        通过名字获取时间ID
        :param name: 热点关键词
        :return: 返回指定热点关键词的热点时间ID
        """
        return self.send_request("gettimeidbyname", {"name": name}, need_decrypt=False)

    def get_all_data_list(self, time_id):
        """
        获取所有数据列表
        :param time_id: 热点时间ID
        :return: 返回指定热点时间ID对应的所有热点数据列表
        """
        # time_id = time_id[2: 9]
        return self.send_request("currentitems", {"timeid": time_id})


if __name__ == "__main__":
    api = WeiboAPI()
    # name_time_id = api.get_time_id_by_name('gidle英文首专')
    # print(name_time_id)
    # search_list = api.get_search_list('p')
    # print(search_list)
    enc_params_data = api.get_rank_history('16岁溺水少年手写感谢信赠民警')
    print(enc_params_data)  # 2023-10-06 09:20:10.0
    enc_params_data = api.get_rank_history('李克强同志遗体11月2日火化')
    # print(enc_params_data)  # 2023-10-06 09:20:10.0
    enc_params_data = api.get_rank_history('神十六航天员回地球')
    # print(enc_params_data)  # 2023-10-06 09:20:10.0
    # print(append_data)

    # time_id = api.get_time_id('2023-10-04 09:20:10')
    # print(time_id)
    # data_list = api.get_all_data_list(time_id)
    # print(data_list)
