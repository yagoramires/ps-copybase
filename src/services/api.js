import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/",
});

console.log(api);
export default api;
