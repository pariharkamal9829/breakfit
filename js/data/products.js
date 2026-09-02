/**
 * BreakFit — Product Catalog
 * Products: Muesli & Edamame Beans
 * Images: exact URLs provided by owner
 */

window.PRODUCTS = [

  // ── 1. Breakfast Muesli ───────────────────────────────────────────────────
  {
    id: "bf-001",
    slug: "breakfast-muesli",
    name: "Breakfast Muesli",
    category: "muesli",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 187,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPypBUI6oNtNbn_21aEq40bF8tbOjpkgLG4-D5csBupmekmxwELgt4Ny8l63LPBklT1nuH39e2UhenQCoPspRu8K_WQZAxS1t8X_xUc6nt&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJgNrih1GluCwhTXG64DcBZhV-jXAVS6mjoZLMIEi0zcm4gDwWcS4iVjFNRW7-xQhwCINpZEb9dUTnt3-tw3bg6ccu8fGdKUyP0VH2pKwz&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh9H7UhVz9KXxYrQ6lQnjgO90Ar6WFn7J4ESiY8Kzag&s=10"
    ],
    variants: [
      { label: "250g", price: 249, sku: "BF-MSL-250", inStock: true },
      { label: "500g", price: 449, sku: "BF-MSL-500", inStock: true },
      { label: "1kg",  price: 849, sku: "BF-MSL-1KG", inStock: true }
    ],
    badge: "Bestseller",
    shortDescription: "Wholesome oats, seeds, nuts & dried fruits — your perfect power-packed breakfast every morning.",
    longDescription: "Our Breakfast Muesli is a carefully balanced blend of rolled oats, sunflower seeds, pumpkin seeds, flaxseeds, almonds, walnuts, and naturally sweet dried fruits. No added sugar, no artificial flavours — just clean, wholesome ingredients that fuel your morning the natural way. Rich in fibre, complex carbohydrates, and plant protein for sustained energy. Serve cold with milk or yoghurt, or warm as a porridge.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "380 kcal" },
      { nutrient: "Protein",       per100g: "11 g"     },
      { nutrient: "Fat",           per100g: "9 g"      },
      { nutrient: "Carbohydrates", per100g: "62 g"     },
      { nutrient: "Fiber",         per100g: "8 g"      },
      { nutrient: "Sugar",         per100g: "12 g"     }
    ],
    tags: ["muesli", "breakfast", "oats", "no-sugar", "high-fiber", "natural"],
    weight: 250,
    origin: "India",
    inStock: true,
    featured: true
  },

  // ── 2. Edamame Beans ──────────────────────────────────────────────────────
  {
    id: "bf-002",
    slug: "edamame-beans",
    name: "Edamame Beans",
    category: "edamame",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 134,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrcNf6pZPaJ42fEc0qmVzzAfNHWBtiM0hrKitlNZquQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfNZ7jGw86WtW24jDdqjPaKUtOzdubYWAW9F9jiTkfXg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrg8o_IGG5ojR-68Hc3577yT9cdzgmlRM0MTfjus_JyQ&s"
    ],
    variants: [
      { label: "200g", price: 199, sku: "BF-EDM-200", inStock: true },
      { label: "400g", price: 369, sku: "BF-EDM-400", inStock: true },
      { label: "800g", price: 699, sku: "BF-EDM-800", inStock: true }
    ],
    badge: "New",
    shortDescription: "Young green soybeans — high protein, low calorie, and incredibly delicious as a snack or meal addition.",
    longDescription: "Edamame are young green soybeans harvested at peak ripeness. Naturally rich in complete plant protein containing all 9 essential amino acids — rare in plant foods. Low in calories, high in fibre, and loaded with vitamins K, C, and folate. Our edamame are carefully sorted, lightly salted, and sealed fresh to preserve their bright green colour and satisfying bite. Perfect as a snack, tossed into salads, or stirred into rice bowls.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "121 kcal" },
      { nutrient: "Protein",       per100g: "11 g"     },
      { nutrient: "Fat",           per100g: "5 g"      },
      { nutrient: "Carbohydrates", per100g: "9 g"      },
      { nutrient: "Fiber",         per100g: "5 g"      },
      { nutrient: "Folate",        per100g: "311 mcg"  }
    ],
    tags: ["edamame", "protein", "vegan", "low-calorie", "snack", "soybean"],
    weight: 200,
    origin: "India",
    inStock: true,
    featured: true
  }
];
