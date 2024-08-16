import axios from "axios";
const rapidapi_key = import.meta.env.VITE_RAPID_API_KEY;

console.log(rapidapi_key);
const getSearchQueryProduct = async (
  query,
  page = 1,
  country = "IN",
  sort_by = "RELEVANCE",
  product_condition = "ALL",
  is_prime = "false"
) => {
  const options = {
    method: "GET",
    url: "https://real-time-amazon-data.p.rapidapi.com/search",
    params: {
      query,
      page,
      country,
      sort_by,
      product_condition,
      is_prime: is_prime.toString(),
    },
    headers: {
      "x-rapidapi-key": rapidapi_key,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductsByCategory = async (
  category = '2478868012',
  page = 1,
  country = "IN",
  sort_by = "RELEVANCE",
  product_condition = "ALL"
) => {
  const options = {
    method: "GET",
    url: "https://real-time-amazon-data.p.rapidapi.com/products-by-category",
    params: {
      category_id: category,
      page: page,
      country,
      sort_by,
      product_condition,
    },
    headers: {
      "x-rapidapi-key": rapidapi_key,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response.data in getProductsByCategory",response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductDetails = async (asin, country = "IN") => {
  const options = {
    method: "GET",
    url: "https://real-time-amazon-data.p.rapidapi.com/product-details",
    params: {
      asin,
      country,
    },
    headers: {
      "x-rapidapi-key": rapidapi_key,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductReviews = async (
  asin,
  country = "US",
  sort_by = "TOP_REVIEWS",
  star_rating = "ALL",
  verified_purchases_only = "false",
  images_or_videos_only = "false",
  current_format_only = "false",
  page = 1
) => {
  const options = {
    method: "GET",
    url: "https://real-time-amazon-data.p.rapidapi.com/product-reviews",
    params: {
      asin,
      country,
      sort_by,
      star_rating,
      verified_purchases_only,
      images_or_videos_only,
      current_format_only,
      page: page.toString(),
    },
    headers: {
      "x-rapidapi-key": rapidapi_key,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getSearchQueryProduct,
  getProductsByCategory,
  getProductDetails,
  getProductReviews,
};