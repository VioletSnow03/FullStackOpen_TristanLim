import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const remove = async (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const changeNumber = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export default { getAll, create, remove, changeNumber };
