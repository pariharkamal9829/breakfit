/**
 * BreakFit — Category Data
 * All images: real Unsplash food photography, not AI-generated.
 * productCount updated to match actual products.js catalog.
 */

const CATEGORIES = [
  {
    id: "all",
    slug: "all",
    name: "All Products",
    description: "Explore our complete range of premium dry fruits, nuts, and healthy snacks.",
    image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=400&h=300&fit=crop&q=90",
    productCount: 14,
    featured: false
  },
  {
    id: "cashews",
    slug: "cashews",
    name: "Cashews",
    description: "Rich, creamy cashews hand-picked from coastal farms.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: true
  },
  {
    id: "almonds",
    slug: "almonds",
    name: "Almonds",
    description: "Nutrient-dense almonds packed with vitamin E and healthy fats.",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: true
  },
  {
    id: "walnuts",
    slug: "walnuts",
    name: "Walnuts",
    description: "Brain-boosting walnuts rich in omega-3 fatty acids.",
    image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: false
  },
  {
    id: "raisins",
    slug: "raisins",
    name: "Raisins",
    description: "Sun-dried raisins bursting with natural sweetness.",
    image: "https://images.unsplash.com/photo-1596591868231-05e808fd3f93?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: false
  },
  {
    id: "dates",
    slug: "dates",
    name: "Dates",
    description: "Soft, caramel-sweet dates — natural energy boosters.",
    image: "https://images.unsplash.com/photo-1593358278257-2ca1b23773ac?w=400&h=300&fit=crop&q=90",
    productCount: 2,
    featured: true
  },
  {
    id: "mixed-nuts",
    slug: "mixed-nuts",
    name: "Mixed Nuts",
    description: "Curated blends for balanced, grab-and-go snacking.",
    image: "https://images.unsplash.com/photo-1554136209-4f5d1c4d2d3c?w=400&h=300&fit=crop&q=90",
    productCount: 4,
    featured: true
  }
];

window.CATEGORIES = CATEGORIES;
