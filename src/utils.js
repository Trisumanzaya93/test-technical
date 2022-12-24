import axios from "axios";

export const getUser = (param) => {
    const queryParam ={
        limit:param.limit ?? 5,
        skip: param.skip ?? 10
    }
    console.log(queryParam);
  const URL = `https://dummyjson.com/users?limit=${queryParam.limit}&skip=${queryParam.skip}`;
    console.log('hehe', URL);
  return axios.get(URL);
}