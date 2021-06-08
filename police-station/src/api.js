import axios from "axios";
const baseURL = 'https://my-json-server.typicode.com/itayalony/VueDB';

export default {
  policeStation() {
    return {
      getActivities: () => axios.get(`${baseURL}/activities`),
      getCops: () => axios.get(`${baseURL}/users`),
    };
  }
};