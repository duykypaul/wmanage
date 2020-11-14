import axios from "axios";

const BASE_DOMAIN = 'http://localhost:1102';
const baseURL = `${BASE_DOMAIN}/api`;

export default axios.create({
  baseURL,
  headers: {
    'accept': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
  }
})

