import api from "./axios";

export async function getMe() {
    const response = await api.get("/users/me");
    return response.data;
}