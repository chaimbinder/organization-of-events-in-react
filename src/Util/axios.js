import axios from "axios";
export default {
  Get: async (url) => {
    const result = await fetch(url);
    const foo = result.json();
    return foo;
  },
  Post: async (url, body) => {
    const result = await axios.post(url, body);
    return result;
  },
};
