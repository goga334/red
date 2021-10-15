import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class Service{

    constructor(props) {

        this.destination = props
    }

    getAll() {
        const url = `${API_URL}/api/${this.destination}/`;
        return axios.get(url).then(response => response.data);
    }
    getByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getById(pk) {
        const url = `${API_URL}/api/${this.destination}_add/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    delete(data){
        const url = `${API_URL}/api/${this.destination}_add/${data.pk}`;
        return axios.delete(url);
    }
    create(data){
        const url = `${API_URL}/api/${this.destination}/`;
        return axios.post(url,data);
    }
    update(data){
        const url = `${API_URL}/api/${this.destination}_add/${data.pk}`;
        return axios.put(url,data);
    }
}
