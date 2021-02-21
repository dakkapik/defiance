import axios from "axios";

export const fetchOrders = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/orders", { cancelToken: token })
    .then((res) => res.data);
};
