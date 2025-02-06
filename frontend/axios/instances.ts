import axios from "axios"

export const axiosProductInstance = axios.create({
    baseURL:'http://localhost:5000/api/products/'
})