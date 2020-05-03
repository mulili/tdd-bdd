import axios from 'axios';
const runCallBack = callBack => {
  callBack(23);
};

const getData = async () => {
  try {
    const data = await axios.get('./api');
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
export { runCallBack, getData };
