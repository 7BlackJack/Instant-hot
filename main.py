import requests
import base64
import json
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

class WeiboAPI:
    def __init__(self):
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
        }
        self.hash_bytes = self.calculate_hash_bytes()

    @staticmethod
    def calculate_hash_bytes():
        hash_object = hashlib.sha1(b"tSdGtmwh49BcR1irt18mxG41dGsBuGKS")
        hash_hex = hash_object.hexdigest()
        hash_hex_16 = hash_hex[:32]
        return bytes.fromhex(hash_hex_16)

    def encrypt(self, text):
        if text is None:
            return None
        cipher = AES.new(self.hash_bytes, AES.MODE_ECB)
        padded_data = pad(text.encode('utf-8'), AES.block_size)
        encrypted_data = cipher.encrypt(padded_data)
        return base64.b64encode(encrypted_data).decode()

    def decrypt(self, encrypted_text):
        encrypted_bytes = base64.b64decode(encrypted_text)
        cipher = AES.new(self.hash_bytes, AES.MODE_ECB)
        decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
        return json.loads(decrypted_bytes.decode('utf-8'))

    def send_request(self, url, params):
        return requests.get(url, headers=self.headers, params=params).text

    def get_search_list(self, quary):
        """
        :param quary: 用于查询接口的参数
        :return: 返回查询参数的明文列表
        """
        enc_quary = self.encrypt(quary)
        response = self.send_request("https://api.weibotop.cn/search", {"searchstr": enc_quary})
        return response

    def get_getrankhistory_name(self, text):
        '''
        :param text: 携带的params 明文参数
        :return: 一条字段的详细数据信息
        '''
        enc_text = self.encrypt(text)
        response = self.send_request("https://api.weibotop.cn/getrankhistory", {"name": enc_text})
        return self.decrypt(response)


    def get_time_id(self, data):
        '''
        :param data: 发送时间的瞬间的时间params 参数格式: 2023-09-01T14:58:18
        :return:
        '''
        TimeStamp = self.encrypt(data)
        response = self.send_request("https://api.weibotop.cn/getclosesttime", {"timestamp": TimeStamp})
        time_list = list(response)
        return ''.join(time_list[2: 9])

    # 根据关键字名字获取该关键字热搜的时刻id
    def get_timeid_byname(self, name):
        """
        :param name: 用于更具关键字名字获取当前发送该热点关键词的时间timeid
        :return:  ["1005358","2023-10-06 09:20:10.0","9"]
        """
        enc_name = self.encrypt(name)
        response = self.send_request("https://api.weibotop.cn/gettimeidbyname", {"name": enc_name})
        print(response)
        time_list = list(response)
        return ''.join(time_list[2: 9])
    # 获取某一时间id 所有数据列表
    def get_all_data_list(self, time_id):
        '''
        :param time_id: 根据AES加密后的 time_id 来进行 那一个时刻的热点列表查询
        :return: 返回解密后的热点列表
        '''
        encrypt_time_id = self.encrypt(time_id)
        encrypted_text = self.send_request("https://api.weibotop.cn/currentitems", {"timeid": encrypt_time_id})
        return self.decrypt(encrypted_text)

if __name__ == "__main__":
    api = WeiboAPI()
    # name_time_id = api.get_timeid_byname('gidle英文首专')

    # search_list = api.get_search_list('p')
    # # print(search_list)
    enc_params_data = api.get_getrankhistory_name('挖呀挖黄老师5场直播销售额超百万')
    print(enc_params_data)  # 2023-10-06 09:20:10.0
    # time_id = api.get_time_id('2023-10-06 09:20:10')
    # print(time_id)
    # data_list = api.get_all_data_list(time_id)
    # print(data_list)
