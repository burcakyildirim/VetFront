import axios from "axios";

export const getAppointments = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/appointments"
    )
    return data;
}

export const deleteAppointments = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL +  `/v1/appointments/${id}`
    )
    return data;
}

export const createAppointments = async (appointments) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/appointments`, appointments
    )
    return data;
}

export const updateAppointmentsAPI = async (appointments) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/appointments/${appointments.id}`, appointments
    )
    return data;
}