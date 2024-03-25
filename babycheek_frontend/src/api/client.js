import axios from 'axios';

const client = axios.create({
  baseURL: process.env.API_BASE_ADDRESS,
})

export const getMenuItems = () => {
  return client.get('/menu/menuItems');
}

export default client;