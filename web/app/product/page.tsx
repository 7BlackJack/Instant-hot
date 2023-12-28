const features = [
	{
		name: "即时热点",
		description:
			"一个实时的热点资讯收集平台，数据热度可视化，让你足不出户更直接且直观置身于世界各地.",
	},
	{ name: "Base64转义", description: "一个特殊的编码格式，用户保护数据安全" },
	{ name: "加/解密", description: "集成各种常见的加/解密算法，" },
	{ name: "翻译吧", description: "在线翻译平台，支持多国语言" },
	// { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
	// { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
];

export default function Example() {
	return (
		<div className="bg-white">
			<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						工具集介绍
					</h2>
					<p className="mt-4 text-gray-500">
						这款多功能工具集是一个集成了多种实用功能的平台，旨在为用户提供一个高效、安全且易于使用的数字解决方案。它包括以下四个核心功能：
					</p>

					<dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
						{features.map((feature) => (
							<div
								key={feature.name}
								className="border-t border-gray-200 pt-4"
							>
								<dt className="font-medium text-gray-900">
									{feature.name}
								</dt>
								<dd className="mt-2 text-sm text-gray-500">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
				<div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
					<img
						src="/images/translationlogo.png"
						alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
						className="rounded-lg bg-gray-100"
					/>
					<img
						src="/images/base64encode.png"
						alt="Top down view of walnut card tray with embedded magnets and card groove."
						className="rounded-lg bg-gray-100"
					/>
					<img
						src="/images/instanthot.png"
						alt="Side of walnut card tray with card groove and recessed card area."
						className="rounded-lg bg-gray-100"
					/>
					<img
						src="/images/enordecrypto.png"
						alt="Walnut card tray filled with cards and card angled in dedicated groove."
						className="rounded-lg bg-gray-100"
					/>
				</div>
			</div>
		</div>
	);
}
