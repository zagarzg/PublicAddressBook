import axios from 'axios';

const baseUrl = "https://localhost:44331/";

const header = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default {

    rCandidates(url = baseUrl + 'Contact/') {
        return {
            fetchAll: (pageNumber, pageSize) => axios.get(`${url}GetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`),
            create: newContact => axios.post(url + 'Create', newContact, header),
            update: updateContact => axios.put(url + 'Update', updateContact, header),
            delete: id => axios.delete(url + 'Delete/' + id)
        }
    }
}