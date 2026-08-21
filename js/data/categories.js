/**
 * BreakFit — Category Data
 * Assigns the CATEGORIES array to window.CATEGORIES for use across all pages.
 *
 * Structure follows the Category interface defined in design.md:
 *   id, slug, name, description, image, productCount, featured
 */

const CATEGORIES = [
  {
    id: "all",
    slug: "all",
    name: "All Products",
    description: "Explore our complete range of premium dry fruits, nuts, and healthy snacks sourced from the finest origins.",
    image: "https://picsum.photos/seed/cat-all/400/300",
    productCount: 14,
    featured: false
  },
  {
    id: "cashews",
    slug: "cashews",
    name: "Cashews",
    description: "Rich, creamy cashews hand-picked from coastal farms for a buttery flavour and satisfying crunch.",
    image: "https://picsum.photos/seed/cat-cashews/400/300",
    productCount: 3,
    featured: true
  },
  {
    id: "almonds",
    slug: "almonds",
    name: "Almonds",
    description: "Nutrient-dense almonds packed with vitamin E, healthy fats, and a naturally mild, sweet taste.",
    image: "https://picsum.photos/seed/cat-almonds/400/300",
    productCount: 3,
    featured: true
  },
  {
    id: "walnuts",
    slug: "walnuts",
    name: "Walnuts",
    description: "Brain-boosting walnuts rich in omega-3 fatty acids, offering a distinctive earthy depth of flavour.",
    image: "https://picsum.photos/seed/cat-walnuts/400/300",
    productCount: 2,
    featured: false
  },
  {
    id: "raisins",
    slug: "raisins",
    name: "Raisins",
    description: "Sun-dried raisins bursting with natural sweetness and antioxidants — a wholesome snack and baking staple.",
    image: "https://picsum.photos/seed/cat-raisins/400/300",
    productCount: 2,
    featured: false
  },
  {
    id: "dates",
    slug: "dates",
    name: "Dates",
    description: "Soft, caramel-sweet dates sourced from premium desert groves, perfect as a natural energy booster.",
    image: "https://picsum.photos/seed/cat-dates/400/300",
    productCount: 2,
    featured: true
  },
  {
    id: "mixed-nuts",
    slug: "mixed-nuts",
    name: "Mixed Nuts",
    description: "Thoughtfully curated blends of premium nuts and dried fruits for a balanced, grab-and-go snacking experience.",
    image: "https://picsum.photos/seed/cat-mixed-nuts/400/300",
    productCount: 2,
    featured: true
  }
];

window.CATEGORIES = CATEGORIES;
