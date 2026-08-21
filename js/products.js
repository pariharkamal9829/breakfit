// BreakFit Product Catalog Data
const BREAKFIT_PRODUCTS = [
  {
    id: "bf-001",
    slug: "premium-cashews",
    name: "Premium Cashews",
    category: "nuts",
    subcategory: "cashews",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=600&q=80",
      "https://images.unsplash.com/photo-1621483121038-e8c8ac75d3cf?w=600&q=80",
      "https://images.unsplash.com/photo-1574570278046-eafc2e7a4f28?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 349, sku: "BF-CSH-250", inStock: true },
      { label: "500g", price: 649, sku: "BF-CSH-500", inStock: true },
      { label: "1kg",  price: 1199, sku: "BF-CSH-1KG", inStock: true }
    ],
    badge: "Bestseller",
    shortDescription: "Whole W320 grade cashews, lightly roasted with a buttery crunch.",
    longDescription: "Our Premium Cashews are sourced directly from the finest cashew farms in Goa. Hand-picked and minimally processed to retain their natural sweetness and buttery texture. Rich in healthy fats, protein, and essential minerals.",
    nutritionFacts: [
      { label: "Calories", value: "553 kcal / 100g" },
      { label: "Protein", value: "18g" },
      { label: "Fats", value: "44g" },
      { label: "Carbs", value: "30g" }
    ],
    tags: ["nuts", "protein", "healthy-fats", "bestseller"],
    weight: 250,
    origin: "Goa, India",
    inStock: true,
    featured: true
  },
  {
    id: "bf-002",
    slug: "california-almonds",
    name: "California Almonds",
    category: "nuts",
    subcategory: "almonds",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80",
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=80",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 299, sku: "BF-ALM-250", inStock: true },
      { label: "500g", price: 549, sku: "BF-ALM-500", inStock: true },
      { label: "1kg",  price: 999, sku: "BF-ALM-1KG", inStock: false }
    ],
    badge: "Organic",
    shortDescription: "Premium California almonds, raw and unsalted for maximum nutrition.",
    longDescription: "Imported directly from California's Central Valley, these premium almonds are naturally rich in Vitamin E, magnesium, and fiber. Perfect as a daily health snack or for cooking.",
    nutritionFacts: [
      { label: "Calories", value: "579 kcal / 100g" },
      { label: "Protein", value: "21g" },
      { label: "Fats", value: "50g" },
      { label: "Carbs", value: "22g" }
    ],
    tags: ["nuts", "vitamin-e", "organic", "raw"],
    weight: 250,
    origin: "California, USA",
    inStock: true,
    featured: true
  },
  {
    id: "bf-003",
    slug: "afghani-walnuts",
    name: "Afghani Walnuts",
    category: "nuts",
    subcategory: "walnuts",
    price: 449,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
      "https://images.unsplash.com/photo-1572443490709-e57452b5166e?w=600&q=80",
      "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 449, sku: "BF-WLN-250", inStock: true },
      { label: "500g", price: 849, sku: "BF-WLN-500", inStock: true },
      { label: "1kg",  price: 1599, sku: "BF-WLN-1KG", inStock: true }
    ],
    badge: "New",
    shortDescription: "Light-coloured Afghani walnuts with thin shells and rich omega-3 content.",
    longDescription: "Sourced from the mountainous regions of Afghanistan, these walnuts are prized for their light colour, thin shells, and exceptional flavour. Packed with omega-3 fatty acids and antioxidants for brain and heart health.",
    nutritionFacts: [
      { label: "Calories", value: "654 kcal / 100g" },
      { label: "Protein", value: "15g" },
      { label: "Fats", value: "65g" },
      { label: "Carbs", value: "14g" }
    ],
    tags: ["nuts", "omega-3", "brain-health", "premium"],
    weight: 250,
    origin: "Afghanistan",
    inStock: true,
    featured: true
  },
  {
    id: "bf-004",
    slug: "medjool-dates",
    name: "Medjool Dates",
    category: "dried-fruits",
    subcategory: "dates",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1600626334012-5f23e5e4b1b7?w=600&q=80",
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 599, sku: "BF-DTS-250", inStock: true },
      { label: "500g", price: 1099, sku: "BF-DTS-500", inStock: true },
      { label: "1kg",  price: 1999, sku: "BF-DTS-1KG", inStock: true }
    ],
    badge: "Bestseller",
    shortDescription: "Large, soft Medjool dates — the king of dates. Natural energy booster.",
    longDescription: "Grown in the fertile valleys of Jordan and Morocco, our Medjool dates are the premium variety — large, soft, and intensely sweet with a caramel-like flavour. A perfect natural sweetener and energy snack.",
    nutritionFacts: [
      { label: "Calories", value: "277 kcal / 100g" },
      { label: "Protein", value: "2g" },
      { label: "Fats", value: "0.2g" },
      { label: "Carbs", value: "75g" }
    ],
    tags: ["dried-fruits", "energy", "natural-sugar", "bestseller"],
    weight: 250,
    origin: "Jordan / Morocco",
    inStock: true,
    featured: true
  },
  {
    id: "bf-005",
    slug: "black-raisins",
    name: "Black Raisins",
    category: "dried-fruits",
    subcategory: "raisins",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 199, sku: "BF-RSN-250", inStock: true },
      { label: "500g", price: 369, sku: "BF-RSN-500", inStock: true },
      { label: "1kg",  price: 699, sku: "BF-RSN-1KG", inStock: true }
    ],
    badge: "Sale",
    shortDescription: "Seedless black raisins with deep flavour and natural antioxidants.",
    longDescription: "Our premium black raisins are sun-dried naturally and contain no added preservatives or colours. Rich in iron, potassium, and antioxidants, they're perfect for cooking, baking, or snacking.",
    nutritionFacts: [
      { label: "Calories", value: "299 kcal / 100g" },
      { label: "Protein", value: "3g" },
      { label: "Fats", value: "0.5g" },
      { label: "Carbs", value: "79g" }
    ],
    tags: ["dried-fruits", "iron", "antioxidants", "sale"],
    weight: 250,
    origin: "Nashik, India",
    inStock: true,
    featured: false
  },
  {
    id: "bf-006",
    slug: "iranian-pistachios",
    name: "Iranian Pistachios",
    category: "nuts",
    subcategory: "pistachios",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=600&q=80",
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      "https://images.unsplash.com/photo-1543314917-9e1fe81c9041?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 799, sku: "BF-PST-250", inStock: true },
      { label: "500g", price: 1499, sku: "BF-PST-500", inStock: true },
      { label: "1kg",  price: 2799, sku: "BF-PST-1KG", inStock: false }
    ],
    badge: "Bestseller",
    shortDescription: "Open-shell Iranian pistachios with a rich, distinct flavour. Lightly salted.",
    longDescription: "Sourced from the Rafsanjan region of Iran — the world's pistachio capital — these open-shell pistachios are known for their larger size, rich green kernel, and distinctive taste. Lightly salted for the perfect balance.",
    nutritionFacts: [
      { label: "Calories", value: "562 kcal / 100g" },
      { label: "Protein", value: "20g" },
      { label: "Fats", value: "45g" },
      { label: "Carbs", value: "28g" }
    ],
    tags: ["nuts", "protein", "salted", "premium"],
    weight: 250,
    origin: "Rafsanjan, Iran",
    inStock: true,
    featured: true
  },
  {
    id: "bf-007",
    slug: "turkish-apricots",
    name: "Turkish Dried Apricots",
    category: "dried-fruits",
    subcategory: "apricots",
    price: 279,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 73,
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80",
      "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?w=600&q=80",
      "https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=600&q=80"
    ],
    variants: [
      { label: "250g", price: 279, sku: "BF-APR-250", inStock: true },
      { label: "500g", price: 519, sku: "BF-APR-500", inStock: true },
      { label: "1kg",  price: 979, sku: "BF-APR-1KG", inStock: true }
    ],
    badge: "Organic",
    shortDescription: "Soft, sun-dried Turkish apricots — naturally sweet with high vitamin A.",
    longDescription: "Our Turkish apricots come from the Malatya region, famous for producing the world's finest dried apricots. Naturally sun-dried without sulphites, they're rich in vitamin A, iron, and dietary fibre.",
    nutritionFacts: [
      { label: "Calories", value: "241 kcal / 100g" },
      { label: "Protein", value: "3g" },
      { label: "Fats", value: "0.5g" },
      { label: "Carbs", value: "63g" }
    ],
    tags: ["dried-fruits", "vitamin-a", "organic", "no-sulphites"],
    weight: 250,
    origin: "Malatya, Turkey",
    inStock: true,
    featured: false
  },
  {
    id: "bf-008",
    slug: "pine-nuts",
    name: "Premium Pine Nuts",
    category: "seeds",
    subcategory: "pine-nuts",
    price: 649,
    originalPrice: 799,
    rating: 4.7,
    reviewCount: 54,
    images: [
      "https://images.unsplash.com/photo-1612195583950-b8fd92b44f10?w=600&q=80",
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=600&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80"
    ],
    variants: [
      { label: "100g", price: 349, sku: "BF-PIN-100", inStock: true },
      { label: "250g", price: 649, sku: "BF-PIN-250", inStock: true },
      { label: "500g", price: 1199, sku: "BF-PIN-500", inStock: false }
    ],
    badge: "New",
    shortDescription: "Delicate pine nuts — perfect for pesto, salads, and baking.",
    longDescription: "Hand-harvested pine nuts with a delicate, buttery flavour. High in zinc, magnesium, and heart-healthy monounsaturated fats. A versatile culinary ingredient from Mediterranean pine forests.",
    nutritionFacts: [
      { label: "Calories", value: "673 kcal / 100g" },
      { label: "Protein", value: "14g" },
      { label: "Fats", value: "68g" },
      { label: "Carbs", value: "13g" }
    ],
    tags: ["seeds", "zinc", "culinary", "new"],
    weight: 100,
    origin: "Mediterranean",
    inStock: true,
    featured: true
  }
];

const BREAKFIT_CATEGORIES = [
  { id: "cat-01", slug: "nuts", name: "Nuts & Kernels", description: "Cashews, almonds, walnuts, pistachios & more", image: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=600&q=80", productCount: 12, featured: true, icon: "🥜" },
  { id: "cat-02", slug: "dried-fruits", name: "Dried Fruits", description: "Dates, raisins, apricots, figs & more", image: "https://images.unsplash.com/photo-1600626334012-5f23e5e4b1b7?w=600&q=80", productCount: 8, featured: true, icon: "🍇" },
  { id: "cat-03", slug: "seeds", name: "Seeds & Superfoods", description: "Chia, flax, pumpkin seeds & more", image: "https://images.unsplash.com/photo-1612195583950-b8fd92b44f10?w=600&q=80", productCount: 6, featured: true, icon: "🌱" },
  { id: "cat-04", slug: "trail-mixes", name: "Trail Mixes", description: "Curated blends for energy & health", image: "https://images.unsplash.com/photo-1543314917-9e1fe81c9041?w=600&q=80", productCount: 5, featured: true, icon: "🥗" },
  { id: "cat-05", slug: "gifting", name: "Gift Boxes", description: "Premium gift boxes for every occasion", image: "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?w=600&q=80", productCount: 4, featured: false, icon: "🎁" },
  { id: "cat-06", slug: "organic", name: "Certified Organic", description: "100% organic certified products", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80", productCount: 7, featured: false, icon: "🌿" }
];

const BREAKFIT_REVIEWS = {
  "bf-001": [
    { id: "r1", author: "Priya Sharma", avatar: "PS", rating: 5, title: "Absolutely love these!", body: "Best cashews I've ever tasted. So fresh and crunchy. Will definitely reorder.", date: "2024-11-15", verified: true },
    { id: "r2", author: "Rahul Mehta", avatar: "RM", rating: 5, title: "Premium quality", body: "W320 grade is exactly what I was looking for. Packaging is also very nice.", date: "2024-11-08", verified: true },
    { id: "r3", author: "Anjali Desai", avatar: "AD", rating: 4, title: "Good but slightly pricey", body: "Quality is top-notch. Would appreciate if they had more discount offers.", date: "2024-10-30", verified: false },
    { id: "r4", author: "Vikram Singh", avatar: "VS", rating: 5, title: "Super fresh!", body: "Received within 2 days. Freshness is amazing. Whole family loved it.", date: "2024-10-22", verified: true }
  ],
  "bf-004": [
    { id: "r5", author: "Deepa Nair", avatar: "DN", rating: 5, title: "Best dates ever", body: "These Medjool dates are giant and so juicy. Perfect for gifting too.", date: "2024-11-18", verified: true },
    { id: "r6", author: "Arjun Kapoor", avatar: "AK", rating: 5, title: "Exactly as described", body: "Soft, sweet and fresh. Will be ordering monthly for sure.", date: "2024-11-01", verified: true }
  ],
  "bf-006": [
    { id: "r7", author: "Kavita Patel", avatar: "KP", rating: 5, title: "Authentic Iranian quality", body: "Big open-shell pistachios with incredible flavour. Very different from local ones.", date: "2024-11-12", verified: true },
    { id: "r8", author: "Suresh Kumar", avatar: "SK", rating: 4, title: "Great taste", body: "Slightly salty which I personally love. Quality is excellent.", date: "2024-10-25", verified: true }
  ]
};

// Export for module usage
if (typeof module !== 'undefined') {
  module.exports = { BREAKFIT_PRODUCTS, BREAKFIT_CATEGORIES, BREAKFIT_REVIEWS };
}
