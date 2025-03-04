// src/services/productService.ts
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/berry/";

export interface Flavor {
  name: string;
  potency: number;
}

export interface Product {
  id: number;
  name: string;
  firmness: string;
  flavors: Flavor[];
  growth_time: number;
  max_harvest: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  natural_gift_type: string;
}

// ✅ Function to fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(API_URL);
  const productList = response.data.results;

  const productDetails = await Promise.all(
    productList.map(async (product: { url: string; name: string }) => {
      const id = extractIdFromUrl(product.url);
      return fetchProductById(id);
    })
  );

  return productDetails.filter((p): p is Product => p !== null);
}

// ✅ Function to fetch product details by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data } = await axios.get(`${API_URL}${id}/`);
    return mapProductData(data, id);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

// 🔄 Helper function to extract ID from URL
function extractIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2], 10);
}

// 🔄 Helper function to map API response
function mapProductData(data: any, id: number): Product {
  return {
    id,
    name: data.name,
    firmness: data.firmness.name,
    flavors: data.flavors.map((f: any) => ({
      name: f.flavor.name,
      potency: f.potency,
    })),
    growth_time: data.growth_time,
    max_harvest: data.max_harvest,
    size: data.size,
    smoothness: data.smoothness,
    soil_dryness: data.soil_dryness,
    natural_gift_type: data.natural_gift_type.name,
  };
}
