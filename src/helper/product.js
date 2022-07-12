import { get } from "./http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "products";

const getProduct = (limit) => {
  return get(`${baseEndpoint}?limit=${limit}`);
};

export default { getProduct };
