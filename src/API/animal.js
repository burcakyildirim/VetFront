import axios from "axios";

export const getAnimals = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/animals")
        return data;
}

export const deleteAnimals = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals/${id}`
    )
    return data;    
}

export const createAnimals = async (animals) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals`,animals)
        return data;        

}

export const updateAnimalsAPI = async (animals) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals/${animals.id}`, animals
    )
    return data;
}

export const getByName = async (name) => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals/name?name=${name}`
    )
    return data;
}

export const getByCustomerName = async (customerName) => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals/customerName?customerName=${customerName}`
    )
    return data;
}