import axios from 'axios';

const getData = async () => {
  try {
    let response = await axios.get(
      'http://www.dell-lee.com/react/api/demo.json'
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getNumber = () => 123;
export { getData, getNumber };
