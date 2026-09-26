/**
 * When fetching from an external api try to transform the data to match yours
 *
 * An AbortController is a built-in JavaScript API that lets you cancel an asynchronous operation,
 */
const API_URL = "https://dummyjson.com/products?limit=10";

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
};

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

async function fetchExternalProducts(): Promise<ProductsResponse> {
  const controller = new AbortController();

  // If the external api does not respond in 5 seconds, abort the request
  const timer = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = (await response.json()) as ProductsResponse;
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request aborted");
      return { products: [], total: 0, skip: 0, limit: 0 };
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("An error occurred:", message);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

fetchExternalProducts()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
