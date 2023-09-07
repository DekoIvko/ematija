import Axios from 'axios';

const axios = Axios.create({})

const authorizationToken = localStorage.getItem('token');

if (authorizationToken !== undefined && authorizationToken !== null) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${authorizationToken}`;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.headers.post['Access-Control-Allow-Methods'] =
  'POST, PUT, DELETE, GET, OPTIONS';

export default axios;