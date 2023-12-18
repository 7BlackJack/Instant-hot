const crypto = require("crypto");
const o =
	"ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl";
const n =
	"ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4";

function decrypt(t) {
	const a = Buffer.alloc(16, g(o)),
		c = Buffer.alloc(16, g(n)),
		i = crypto.createDecipheriv("aes-128-cbc", a, c);
	//, i = r.a.createDecipheriv("aes-128-cbc", a, c);
	let s = i.update(t, "base64", "utf-8");
	return (s += i.final("utf-8")), s;
}

function g(e) {
	return crypto.createHash("md5").update(e).digest();
	// r.a.createHash("md5").update(e).digest()
}
// 示例使用
const encryptedText =
	"Z21kD9ZK1ke6ugku2ccWu-MeDWh3z252xRTQv-wZ6jd-f4VUaQOlThzHO02JcemZ7CGRLOqO6AGOYX2SrEO3X1IoJtftU1OYnsl-zjvnHn8dSkVcSSkvYYwR-uJHwqv-1LKFX4aSfKgLV6oxg31QCiHL4XAXX5czdXSTuO4K71F80bEnGpyaaB1wIR4it1yRULObS--4puANLnqFv9zQEDrEheRbw9Ha0Tk3xoqCZmddfMF2dAPLwnoRk7IwutxJ40es1dvUOVMb1pkuVM8ylOKQ4DJ2mU-CiJYUG-EOKZonmN9aREtYBaBZdnJiZiOEOowyi6Jjzpf_YlYWN5fplrlHO8qeDc0WRdkntwPnGQ5px0NjCP49AGJmNGtp8uPtnUetGGIZHK3sY9Vw107NYPUbIGhp4AVDCSuqpIo4oo6QfwuiUb8yzwPUx0PXVtSTLJQLj8XpZbWyzW8js6x11VditySZoEutrxpSQ9KNAVKcNxE5aJVuXwknR-uQraHxCZ0k2Y9MxtGH_LhJt3uRdkUznVvMx5p3KFTWXD3oxKe9wazsjWCGGuEfd3v-RPcuAUUcge83yrhlzZUpGhrk2DveHqLfLbGsMlIKdGmewICkkO7OlYSxwLMYRZMqu8coSvVD83ZYp2czl5rFkPbMueHTooO5RUtRYCC7NlXpkc7ay2BZDSESA7y1SV85wsGzeRc2wJVM2i_zE7xyxUpABPUefqpsLaSTAiiPDeC5gx_6DZBxo-dNTdmNhgsgT-_ardRxbp_z9oaMPf9S1A4PuzsLpwlMCNDqJUgh8hSkgS2IM190-y-5CHDLM_5GvGLS-Ps66SJe7ZQh9WnA1pbfuzraSbtVpZ5FDJibW5EL3YPVroVhSXvrcXGpYmH-oh4S"; // 替换为您要加密的文本

const result = decrypt(encryptedText);
console.log("Decrypted:", result);
