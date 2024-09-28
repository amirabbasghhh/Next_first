import axios from "axios";

const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/',
    headers:{  
          'Content-Type': 'application/json; charset=utf-8'
    }
})

export {api}