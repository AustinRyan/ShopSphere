interface Product {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  category: string;
  subcategory?: string;
}

export const categories = [
  {
    name: "Woman's Fashion",
    subcategories: ["Dresses", "Tops", "Shoes", "Bags", "Accessories"]
  },
  {
    name: "Men's Fashion",
    subcategories: ["T-Shirts", "Shirts", "Pants", "Shoes", "Accessories"]
  },
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Cameras", "Accessories"]
  },
  {
    name: "Home & Lifestyle",
    subcategories: ["Furniture", "Decor", "Lighting", "Kitchen", "Bedding"]
  },
  {
    name: "Medicine",
    subcategories: ["Vitamins", "Supplements", "First Aid", "Personal Care"]
  },
  {
    name: "Sports & Outdoor",
    subcategories: ["Exercise Equipment", "Outdoor Gear", "Sports Apparel", "Camping"]
  },
  {
    name: "Baby's & Toys",
    subcategories: ["Baby Clothing", "Baby Care", "Toys", "Educational"]
  },
  {
    name: "Groceries & Pets",
    subcategories: ["Food", "Beverages", "Pet Food", "Pet Supplies"]
  },
  {
    name: "Health & Beauty",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"]
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "Xbox Controller",
    currentPrice: 120,
    originalPrice: 160,
    description: "Premium gaming controller with customizable buttons and ergonomic design for extended gaming sessions.",
    rating: 5,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600080971445-c4728e6f5e51?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600080971674-56fc8b7b53e0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600080971661-26124b617b1e?auto=format&fit=crop&q=80&w=800"
    ],
    colors: ['#000000', '#FFFFFF', '#DB4444'],
    sizes: ['S', 'M', 'L'],
    category: "Electronics",
    subcategory: "Gaming"
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    currentPrice: 960,
    originalPrice: 1160,
    description: "Mechanical gaming keyboard with RGB backlight, N-key rollover, and durable switches for precise gaming control.",
    rating: 4,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800",
    colors: ['#000000', '#FFFFFF'],
    category: "Electronics",
    subcategory: "Gaming"
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    currentPrice: 370,
    originalPrice: 400,
    description: "27-inch IPS gaming monitor with 144Hz refresh rate, 1ms response time, and HDR support for immersive gaming.",
    rating: 5,
    reviews: 99,
    image: "https://images.unsplash.com/photo-1619953942547-233eab5a70d6?auto=format&fit=crop&q=80&w=800",
    colors: ['#000000'],
    category: "Electronics",
    subcategory: "Gaming"
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    currentPrice: 375,
    originalPrice: 400,
    description: "Ergonomic gaming chair with adjustable armrests, lumbar support, and breathable mesh material.",
    rating: 4.5,
    reviews: 99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800",
    colors: ['#000000', '#DB4444', '#808080'],
    category: "Home & Lifestyle",
    subcategory: "Furniture"
  },
  {
    id: 5,
    name: "The North Coat",
    currentPrice: 260,
    originalPrice: 360,
    description: "Premium winter coat with water-resistant material and warm insulation for cold weather protection.",
    rating: 5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#4A5568', '#2D3748'],
    category: "Men's Fashion",
    subcategory: "Shirts"
  },
  {
    id: 6,
    name: "Gucci Duffle Bag",
    currentPrice: 960,
    originalPrice: 1160,
    description: "Luxury duffle bag with signature Gucci design, premium leather, and spacious compartments.",
    rating: 4.5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
    colors: ['#000000', '#8B4513'],
    category: "Woman's Fashion",
    subcategory: "Bags"
  },
  {
    id: 7,
    name: "RGB Liquid CPU Cooler",
    currentPrice: 160,
    originalPrice: 170,
    description: "Advanced liquid cooling system with RGB lighting and efficient heat dissipation for high-performance CPUs.",
    rating: 4.5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    subcategory: "Accessories"
  },
  {
    id: 8,
    name: "Large Bookshelf",
    currentPrice: 360,
    originalPrice: 400,
    description: "Spacious modern bookshelf with adjustable shelves and durable construction for your home library.",
    rating: 5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800",
    colors: ['#8B4513', '#D2691E', '#A0522D'],
    category: "Home & Lifestyle",
    subcategory: "Furniture"
  },
  {
    id: 9,
    name: "Breed Dry Dog Food",
    currentPrice: 100,
    description: "Premium dry dog food with balanced nutrition and natural ingredients for your pet's health.",
    rating: 3,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    category: "Groceries & Pets",
    subcategory: "Pet Food"
  },
  {
    id: 10,
    name: "CANON EOS DSLR Camera",
    currentPrice: 360,
    description: "Professional DSLR camera with high-resolution sensor and advanced autofocus system.",
    rating: 4.7,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    subcategory: "Cameras"
  },
  {
    id: 11,
    name: "ASUS FHD Gaming Laptop",
    currentPrice: 700,
    description: "High-performance gaming laptop with dedicated GPU and high refresh rate display.",
    rating: 5,
    reviews: 325,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    subcategory: "Laptops"
  },
  {
    id: 12,
    name: "Curology Product Set",
    currentPrice: 500,
    description: "Personalized skincare set with custom formulations for your unique skin needs.",
    rating: 4.5,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?auto=format&fit=crop&q=80&w=800",
    category: "Health & Beauty",
    subcategory: "Skincare"
  },
  {
    id: 13,
    name: "Floral Summer Dress",
    currentPrice: 89.99,
    originalPrice: 129.99,
    description: "Beautiful floral print summer dress with adjustable straps and flowing silhouette.",
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: "Woman's Fashion",
    subcategory: "Dresses"
  },
  {
    id: 14,
    name: "Men's Casual Blazer",
    currentPrice: 199.99,
    originalPrice: 249.99,
    description: "Stylish casual blazer perfect for both formal and semi-formal occasions.",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2B4C7E', '#8B4513'],
    category: "Men's Fashion",
    subcategory: "Shirts"
  },
  {
    id: 15,
    name: "Modern Coffee Table",
    currentPrice: 299.99,
    originalPrice: 399.99,
    description: "Contemporary coffee table with tempered glass top and wooden base.",
    rating: 4.6,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
    colors: ['#8B4513', '#000000', '#A0522D'],
    category: "Home & Lifestyle",
    subcategory: "Furniture"
  },
  {
    id: 16,
    name: "Vitamin C Serum",
    currentPrice: 34.99,
    originalPrice: 44.99,
    description: "Brightening vitamin C serum with hyaluronic acid for radiant skin.",
    rating: 4.7,
    reviews: 283,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    category: "Health & Beauty",
    subcategory: "Skincare"
  },
  {
    id: 17,
    name: "Yoga Mat Set",
    currentPrice: 49.99,
    originalPrice: 69.99,
    description: "Complete yoga mat set with blocks, strap, and carrying bag.",
    rating: 4.9,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800",
    colors: ['#4B0082', '#2E8B57', '#DB7093'],
    category: "Sports & Outdoor",
    subcategory: "Exercise Equipment"
  }
];