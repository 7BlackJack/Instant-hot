# 即时热点 

## 概览

`WeiboAPI` 是一个 Python 类库，用于实现与微博某些非官方 API 的交互，主要用于获取和分析微博热点数据。该库正在逆向接口阶段，并进行了数据接口封装。



## 主要功能

### 1. 关键词搜索

- 根据搜索关键词（key）查询与此关键词所有相关联的热点标题。

- 返回该热点关键词出现的时间。

  

### 2. 时间点热点列表

- 根据准确的时间参数（格式：YYYY-MM-DD HH:mm:ss）或时间 ID（`time_id`）获取该时刻的最新热点列表。

- 支持最多获取五十条热点数据，并支持分页查询。

  

### 3. 关键词详细信息

- 获取特定热点关键词的详细信息，包括：
  - 出现时间（例如，'2023-10-08 07:50:11.0'）
  - 当前时刻的排名（例如，'1'）
  - 微博热搜热度量（例如，'93578'）

### 4. 时间 ID 获取

- 根据时间日期瞬间（格式：YYYY-MM-DD HH:mm:ss）获取对应的时间 ID。

- 该功能主要用于转换时间日期为 `time_id`，以便于获取热点数据列表。

  

## 方法描述

- `get_search_list(quary: str)`: 获取与查询参数匹配的热点关键词列表。

- `get_getrankhistory_name(text: str)`: 获取特定热点关键词的详细排名历史。

- `get_time_id(data: str)`: 根据时间戳获取最接近的热点时间 ID。

- `get_timeid_byname(name: str)`: 根据热点关键词名获取对应的热点时间 ID。

- `get_all_data_list(time_id: str)`: 获取某一热点时间 ID 对应的所有热点数据列表。

  

## 代码示例

```python
api = WeiboAPI()
enc_params_data = api.get_getrankhistory_name('挖呀挖黄老师5场直播销售额超百万')
print(enc_params_data)
```

## 依赖项

- `requests`
- `base64`
- `json`
- `hashlib`
- `Crypto.Cipher`
- `Crypto.Util.Padding`



## 注意事项

- 这是一个非官方库，使用时请遵守微博的使用政策和条款。
- 由于这是一个基于非官方 API 的库，API 结构和数据随时可能改变。

