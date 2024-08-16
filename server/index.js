import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

const products = [
    { id: 1, name: 'Wireless Earbuds', actualPrice: 59.99, discountedPrice: 49.99, description: 'High-quality wireless earbuds with noise cancellation.', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smart Watch', actualPrice: 199.99, discountedPrice: 179.99, description: 'Feature-packed smartwatch with health tracking capabilities.', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bluetooth Speaker', actualPrice: 79.99, discountedPrice: 69.99, description: 'Portable Bluetooth speaker with exceptional sound quality.', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Laptop Backpack', actualPrice: 49.99, discountedPrice: 39.99, description: 'Durable and spacious laptop backpack with multiple compartments.', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Wireless Mouse', actualPrice: 29.99, discountedPrice: 24.99, description: 'Ergonomic wireless mouse for improved productivity.', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'External SSD', actualPrice: 89.99, discountedPrice: 79.99, description: 'Fast and reliable external SSD for additional storage.', image: 'https://via.placeholder.com/150' },
  ];  

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
