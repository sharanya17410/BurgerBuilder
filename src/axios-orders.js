import axios from 'axios';


const instance = axios.create({
    baseURL:'https://react-my-burger-2ab99.firebaseio.com/'
});

export default instance;