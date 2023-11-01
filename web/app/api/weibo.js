import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // 这里要填写你的后端API地址

export const searchList = async (query) => {
  const response = await axios.get(`${BASE_URL}/search_list/${query}`);
  console.log(response.data);
  return response.data;
}

export const rankHistory = async (texts) => {
  // 过滤掉空字符串，只为非空的主题名称发送请求
  const validTexts = texts.filter(text => text !== "");

  const dataPromises = validTexts.map(text => 
    axios.get(`${BASE_URL}/rank_history/${text}`)
  );

  const responses = await Promise.all(dataPromises);

  return responses.map(response => response.data);
}

export const getTimeId = async (timestamp) => {
  // 将ISO格式的字符串转换为Date对象
  const date = new Date(timestamp);
  
  // 提取日期和时间的各个组成部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // 组合为"YYYY-MM-DD HH:mm:ss"格式
  const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const response = await axios.get(`${BASE_URL}/time_id/${formattedTimestamp}`);
  return response.data;
}

export const getTimeIdByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/time_id_by_name/${name}`);
  return response.data;
}

export const getAllDataList = async (time_id) => {
  const response = await axios.get(`${BASE_URL}/all_data_list/${time_id}`);
  return response.data;
}



export const getTimeIdAndAllData = async (timestamp) => {
    // 首先，根据timestamp获取time_id
    const timeIdResult = await getTimeId(timestamp);
    
    // 从返回结果中提取time_id
    if (timeIdResult && timeIdResult.data) {
        const timeIdData = JSON.parse(timeIdResult.data);
        const time_id = timeIdData && timeIdData[0];

        if (time_id) {
            // 使用time_id获取所有的热点数据列表
            const allDataResult = await axios.get(`${BASE_URL}/all_data_list/${time_id}`);
            
            // 返回热点数据列表
            return allDataResult.data;
        }
    }
    
    return null;
}
