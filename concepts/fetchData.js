import axios from 'axios';

const fetchData = fn => {
  axios.get('http://www.dell-lee.com/react/api/demo.json').then(response => {
    fn(response.data);
  });
};
const fetch = () => axios.get('http://www.dell-lee.com/react/api/demo.json');

export { fetchData, fetch };
