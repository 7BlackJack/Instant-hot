import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import requests
import hashlib
import time
from urllib.parse import urlencode
import execjs
import random
import string
from Crypto.Cipher import AES
import base64
import re



def generate_random_ip():
    return ".".join(str(random.randint(0, 255)) for _ in range(4))

def generate_random_cookie():
    def random_digits(length):
        return ''.join(random.choices(string.digits, k=length))

    decimal_part = random_digits(9)
    integer_part = random_digits(10)
    random_ip = generate_random_ip()

    return f"OUTFOX_SEARCH_USER_ID_NCOO={integer_part}.{decimal_part}; OUTFOX_SEARCH_USER_ID=-{integer_part}@{random_ip}"


class Translator:
    def __init__(self):
        self.client = "fanyideskweb"
        self.product = "webfanyi"
        self.key = "fsdsogkndfokasodnaso"

    def generate_signature(self, mysticTime):
        string_to_sign = f"client={self.client}&mysticTime={mysticTime}&product={self.product}&key={self.key}"
        return hashlib.md5(string_to_sign.encode()).hexdigest()

    def translate(self, text):
        mysticTime = int(time.time() * 1000)
        sign = self.generate_signature(mysticTime)

        data = {
            "i": text,
            "from": "auto",
            "to": "",
            "domain": "0",
            "dictResult": "true",
            "keyid": "webfanyi",
            "sign": sign,
            "client": "fanyideskweb",
            "product": "webfanyi",
            "appVersion": "1.0.0",
            "vendor": "web",
            "pointParam": "client,mysticTime,product",
            "mysticTime": mysticTime,
            "keyfrom": "fanyi.web",
            "mid": "1",
            "screen": "1",
            "model": "1",
            "network": "wifi",
            "abtest": "0",
            "yduuid": "abcdefg",
        }

        response = requests.post("https://dict.youdao.com/webtranslate", headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": generate_random_cookie(),
            "Origin": "https://fanyi.youdao.com",
            "Referer": "https://fanyi.youdao.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }, data=urlencode(data))
        encrypted_text = response.text
        return self.decrypt(encrypted_text)

    def decrypt(self, encrypted_text):
        key = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl"
        iv = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4"
        hash_key = hashlib.md5(key.encode(encoding='UTF-8')).digest()[:16]
        hash_iv = hashlib.md5(iv.encode(encoding='UTF-8')).digest()[:16]
        cypter = AES.new(hash_key, AES.MODE_CBC, hash_iv)
        resulttext = cypter.decrypt(base64.urlsafe_b64decode(encrypted_text))
        # 去除填充
        padding_length = resulttext[-1]
        result = resulttext[:-padding_length].decode("UTF-8")
        return result


# # 使用
# translator = Translator()
# translated_text = translator.translate("baby")
# print(translated_text)
