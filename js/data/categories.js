/**
 * BreakFit — Category Data
 * Current categories: Muesli & Edamame only
 */

const CATEGORIES = [
  {
    id: "all",
    slug: "all",
    name: "All Products",
    description: "All our healthy snacks and breakfast options.",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: false
  },
  {
    id: "muesli",
    slug: "muesli",
    name: "Muesli",
    description: "Wholesome oats, seeds & dried fruits for the perfect breakfast.",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&h=300&fit=crop&q=90",
    productCount: 1,
    featured: true
  },
  {
    id: "edamame",
    slug: "edamame",
    name: "Edamame",
    description: "Young green soybeans — high protein, low calorie snack.",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=300&fit=crop&q=90",
    productCount: 1,
    featured: true
  }
];

window.CATEGORIES = CATEGORIES;
