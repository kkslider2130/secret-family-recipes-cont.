import axios from 'axios';

export default() => {
    const token = localStorage.getItem('token');
    return axios.create({
        
        baseURL: 'https://family-recipes-api-server.herokuapp.com/api',
        
        headers: {
            authorization : `${token}`
        }
       
    })
};