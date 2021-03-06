import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllEquipment = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addEquipment = (equipObj) => axios.post(`${baseUrl}/equipment.json`, equipObj);

const deleteEquipById = (equipId) => axios.delete(`${baseUrl}/equipment/${equipId}.json`);

const getEquipById = (equipId) => axios.get(`${baseUrl}/equipment/${equipId}.json`);

const updateEquipment = (equipId, editedEquipObj) => axios.put(`${baseUrl}/equipment/${equipId}.json`, editedEquipObj);

const patchEquipment = (equipmentId, addedEquipObj) => axios.patch(`${baseUrl}/equipment/${equipmentId}.json`, addedEquipObj);

export default {
  getAllEquipment,
  deleteEquipById,
  getEquipById,
  addEquipment,
  updateEquipment,
  patchEquipment,
};
