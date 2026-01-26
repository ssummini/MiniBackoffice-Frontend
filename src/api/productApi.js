import api from './axios';

export async function getProducts() {
    const response = await api.get('/products');
    return response.data; // ProductResponse[] 리스트
}
