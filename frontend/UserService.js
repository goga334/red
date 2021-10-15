import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class UserService{

    getAll() {
        const url = `${API_URL}/api/user/`;
        return axios.get(url).then(response => response.data);
    }
    getByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getById(pk) {
        const url = `${API_URL}/api/user_add/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    delete(user){
        const url = `${API_URL}/api/user_add/${user.pk}`;
        return axios.delete(url);
    }
    create(user){
        const url = `${API_URL}/api/user/`;
        return axios.post(url,user);
    }
    update(user){
        const url = `${API_URL}/api/user_add/${user.pk}`;
        return axios.put(url,user);
    }
}
