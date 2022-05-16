const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };
/**
 * 格式化时间戳为 Y-M-D
 * @param {*} timestamp
 */
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
};

export {
    formatTimestamp
};