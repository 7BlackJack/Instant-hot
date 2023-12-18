const CryptoJS = require("crypto-js")
const axios = require("axios");

// 签名生成函数
function generateSignature(client, mysticTime, product, key) {
    const stringToSign = `client=${client}&mysticTime=${mysticTime}&product=${product}&key=${key}`;
    return CryptoJS.MD5(stringToSign).toString();
}

const client = "fanyideskweb"; // 客户端信息
const product = "webfanyi"; // 产品信息
const key = "fsdsogkndfokasodnaso"; // 密钥
const mysticTime = new Date().getTime(); // 当前时间戳


// 计算并输出签名
const sign = generateSignature(client, mysticTime, product, key);

axios({
	method: "post",
	url: "https://dict.youdao.com/webtranslate",
	headers: {
		Accept: "application/json, text/plain, */*",
		"Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
		"Content-Type": "application/x-www-form-urlencoded",
		Cookie: "OUTFOX_SEARCH_USER_ID_NCOO=11719962.537275659; OUTFOX_SEARCH_USER_ID=-1109966296@98.126.213.32",  // Cookie 需要逆向
		Origin: "https://fanyi.youdao.com",
		Pragma: "no-cache",
		Referer: "https://fanyi.youdao.com/",

		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

	},
	data: new URLSearchParams({
		i: "baby",
		from: "auto",
		to: "",
		domain: "0",
		dictResult: "true",
		keyid: "webfanyi",
		sign: sign,
		client: "fanyideskweb",
		product: "webfanyi",
		appVersion: "1.0.0",
		vendor: "web",
		pointParam: "client,mysticTime,product",
		mysticTime: mysticTime,
		keyfrom: "fanyi.web",
		mid: "1",
		screen: "1",
		model: "1",
		network: "wifi",
		abtest: "0",
		yduuid: "abcdefg",
	}).toString(),
})
	.then((response) => {
		console.log(response.data);
	})
	.catch((error) => {
		console.error("Error:", error);
	});