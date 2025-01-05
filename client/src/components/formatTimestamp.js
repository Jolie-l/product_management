   import dayjs from 'dayjs';
   
   // 时间格式化函数
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '-'; // 如果没有值，返回一个默认提示
        const date = new Date(timestamp);
        return dayjs(timestamp).format('YYYY-MM-DD') // 使用本地化字符串格式，可以根据需要调整
    };

    export default formatTimestamp;