import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/crops";

function cropUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getCrops() {
    return http.get(apiEndpoint);
  }
  
  export function getCrop(cropId) {
    return http.get(cropUrl(cropId));
  }
  
  export function saveCrop(crop) {
    if (crop._id) {
      const body = { ...crop };
      delete body._id;
      return http.put(cropUrl(crop._id), body);
    }
  
    return http.post(apiEndpoint, crop);
  }
  
  export function deleteCrop(cropId) {
    return http.delete(cropUrl(cropId));
  }
