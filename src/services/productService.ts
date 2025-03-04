import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function fetchProductById(id: number) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function addProduct(product: any) {
  const response = await axios.post(API_URL, product);
  return response.data;
}

export async function updateProduct(id: number, product: any) {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
}

export async function deleteProduct(id: number) {
  await axios.delete(`${API_URL}/${id}`);
}
