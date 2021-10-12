import axios from 'axios';
const API_URL = 'http://localhost:8000';



export default class GroupService{

    constructor(){}


    getGroups() {
        const url = `${API_URL}/api/group/`;
        return axios.get(url).then(response => response.data);
    }
    getGroupByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getGroup(pk) {
        const url = `${API_URL}/api/group_add/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteGroup(group){
        const url = `${API_URL}/api/group_add/${group.pk}`;
        return axios.delete(url);
    }
    createGroup(group){
        const url = `${API_URL}/api/group/`;
        return axios.post(url,group);
    }
    updateGroup(group){
        const url = `${API_URL}/api/group_add/${group.pk}`;
        return axios.put(url,group);
    }
}