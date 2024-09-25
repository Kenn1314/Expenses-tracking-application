import axios from 'axios';


export const apiClient = axios.create({
  baseURL: 'http://192.168.0.148:3333/api/', // Replace with your API base 
  // baseURL: 'http://192.168.1.116:3333/api/', // CN
  
  // timeout: 10000, // Set a timeout for requests (10 seconds in this example)
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});