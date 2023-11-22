import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8080/api', })

// ### Master file #######
export const getMasterBoxItems = () => api.get(`/get-master-box-items`)
export const insertMasterBoxItems = (data) => api.post(`/insert-master-box-items`, data)
export const deleteAllMasterBoxItems = () => api.delete(`/delete-all-master-box-items`)

const apis = {
    getMasterBoxItems,
    insertMasterBoxItems,
    deleteAllMasterBoxItems,
}


export default apis