import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class Service{

    getAll(dest) {
        const url = `${API_URL}/api/${dest}/`;
        return axios.get(url).then(response => response.data);
    }
    getByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getById(pk, dest) {
        const url = `${API_URL}/api/${dest}_add/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    checkByValue(value, dest) {
        const url = `${API_URL}/api/${dest}/`;
        return axios.post(url, value).then(response => response.data);
    }
    delete(data, dest){
        const url = `${API_URL}/api/${dest}_add/${data.pk}`;
        return axios.delete(url);
    }
    create(data, dest){
        const url = `${API_URL}/api/${dest}/`;
        return axios.post(url,data);
    }
    update(data, dest){
        const url = `${API_URL}/api/${dest}_add/${data.pk}`;
        return axios.put(url,data);
    }
}
