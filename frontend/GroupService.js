import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class GroupService{

    getAll() {
        const url = `${API_URL}/api/group/`;
        return axios.get(url).then(response => response.data);
    }
    getByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getById(pk) {
        const url = `${API_URL}/api/group_add/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    delete(group){
        const url = `${API_URL}/api/group_add/${group.pk}`;
        return axios.delete(url);
    }
    create(group){
        const url = `${API_URL}/api/group/`;
        return axios.post(url,group);
    }
    update(group){
        const url = `${API_URL}/api/group_add/${group.pk}`;
        return axios.put(url,group);
    }
}