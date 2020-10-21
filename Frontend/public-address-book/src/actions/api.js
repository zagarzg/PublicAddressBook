import axios from 'axios';

const baseUrl = "https://localhost:44331/"

export default {

    rCandidates(url = baseUrl + 'Contact/') {

        
        return {
            fetchAll: () => axios.get(url+'GetAll'),
            create: (data) => axios.post(url+'Create', {...data} , {headers: {
                "Content-Type": "application/json"}})
        }
    }
}