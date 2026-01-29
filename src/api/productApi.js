import api from './axios';

export async function getProducts() {
  const response = await api.get('/products');
  return response.data;
}

export async function createProduct(payload) {
  const response = await api.post('/products', payload);
  return response.data;
}

export async function deleteProduct(productId) {
  await api.delete(`/products/${productId}`);
}

export async function updateProduct(id, data) {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
}