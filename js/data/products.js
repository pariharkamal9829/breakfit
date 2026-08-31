/**
 * BreakFit — Product Catalog
 * js/data/products.js
 *
 * All images: hand-curated Unsplash real food photography — no AI generated images.
 * Each product uses 3 distinct, high-quality shots with proper framing for its type.
 */

window.PRODUCTS = [

  // ── 1. Premium W320 Cashews ──────────────────────────────────────────────
  {
    id: "bf-001",
    slug: "premium-cashews",
    name: "Premium W320 Cashews",
    category: "cashews",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1611492174547-4cd61f8b9c6c?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 349,  sku: "BF-CSH-250",  inStock: true  },
      { label: "500g",  price: 649,  sku: "BF-CSH-500",  inStock: true  },
      { label: "1kg",   price: 1199, sku: "BF-CSH-1KG",  inStock: true  }
    ],
    badge: "Bestseller",
    shortDescription: "Whole W320 grade cashews from Goa, lightly roasted with a signature buttery crunch.",
    longDescription: "Our Premium W320 Cashews are hand-picked from the finest cashew orchards on the Konkan coast of Goa. Carefully graded, minimally processed, and packed fresh to retain their natural sweetness and creamy texture. Each cashew is whole and plump — none of the broken pieces you find in supermarket bags. Rich in heart-healthy monounsaturated fats, plant-based protein, and essential minerals like magnesium and zinc.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "553 kcal" },
      { nutrient: "Protein",       per100g: "18 g"     },
      { nutrient: "Fat",           per100g: "44 g"     },
      { nutrient: "Carbohydrates", per100g: "30 g"     },
      { nutrient: "Fiber",         per100g: "3 g"      },
      { nutrient: "Sodium",        per100g: "12 mg"    }
    ],
    tags: ["cashews", "protein", "healthy-fats", "bestseller", "goa"],
    weight: 250,
    origin: "Goa, India",
    inStock: true,
    featured: true
  },

  // ── 2. Roasted & Salted Cashews ──────────────────────────────────────────
  {
    id: "bf-002",
    slug: "roasted-salted-cashews",
    name: "Roasted & Salted Cashews",
    category: "cashews",
    price: 379,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 118,
    images: [
      "https://images.unsplash.com/photo-1611492174547-4cd61f8b9c6c?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 379,  sku: "BF-RSC-250",  inStock: true  },
      { label: "500g",  price: 699,  sku: "BF-RSC-500",  inStock: true  },
      { label: "1kg",   price: 1299, sku: "BF-RSC-1KG",  inStock: true  }
    ],
    badge: "New",
    shortDescription: "Crunchy oven-roasted cashews with a light dusting of Himalayan pink salt.",
    longDescription: "Starting with whole W240 grade cashews, we slow-roast them in small batches to bring out a deep, nutty flavour without any added oil. A fine dusting of Himalayan pink salt enhances the natural sweetness. No artificial flavouring, no preservatives — just honest, crunchy goodness in every handful.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "570 kcal" },
      { nutrient: "Protein",       per100g: "17 g"     },
      { nutrient: "Fat",           per100g: "46 g"     },
      { nutrient: "Carbohydrates", per100g: "29 g"     },
      { nutrient: "Fiber",         per100g: "3 g"      },
      { nutrient: "Sodium",        per100g: "180 mg"   }
    ],
    tags: ["cashews", "roasted", "salted", "snack", "new"],
    weight: 250,
    origin: "Kerala, India",
    inStock: true,
    featured: false
  },

  // ── 3. California Almonds (Raw) ───────────────────────────────────────────
  {
    id: "bf-003",
    slug: "california-almonds-raw",
    name: "California Almonds — Raw",
    category: "almonds",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 299,  sku: "BF-ALM-250",  inStock: true  },
      { label: "500g",  price: 549,  sku: "BF-ALM-500",  inStock: true  },
      { label: "1kg",   price: 999,  sku: "BF-ALM-1KG",  inStock: false }
    ],
    badge: "Organic",
    shortDescription: "Premium raw California almonds — naturally rich in Vitamin E and fibre, certified organic.",
    longDescription: "Imported directly from California's sun-drenched Central Valley, these premium raw almonds undergo a gentle pasteurisation process that preserves their natural nutrients without roasting. Each almond is packed with Vitamin E, magnesium, calcium, and dietary fibre. Certified organic, free from pesticides and synthetic fertilisers.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "579 kcal" },
      { nutrient: "Protein",       per100g: "21 g"     },
      { nutrient: "Fat",           per100g: "50 g"     },
      { nutrient: "Carbohydrates", per100g: "22 g"     },
      { nutrient: "Fiber",         per100g: "13 g"     },
      { nutrient: "Vitamin E",     per100g: "25.6 mg"  }
    ],
    tags: ["almonds", "vitamin-e", "organic", "raw", "california"],
    weight: 250,
    origin: "California, USA",
    inStock: true,
    featured: true
  },

  // ── 4. Mamra Almonds ─────────────────────────────────────────────────────
  {
    id: "bf-004",
    slug: "mamra-almonds",
    name: "Mamra Almonds (Irani)",
    category: "almonds",
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviewCount: 97,
    images: [
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 799,  sku: "BF-MAM-250",  inStock: true  },
      { label: "500g",  price: 1499, sku: "BF-MAM-500",  inStock: true  },
      { label: "1kg",   price: 2799, sku: "BF-MAM-1KG",  inStock: true  }
    ],
    badge: "Bestseller",
    shortDescription: "Rare, oil-rich Mamra almonds from Iran — prized in Ayurveda for superior nutrition.",
    longDescription: "Mamra almonds are the rare, wild variety grown in the mountainous regions of Iran and Afghanistan. They are smaller, extremely oil-rich, and carry a more intense, complex flavour. Revered in Ayurveda as a superfood for brain health, memory, and vitality. Because of their rarity and superior oil content, Mamra almonds command a premium price and are often gifted during festivals.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "598 kcal" },
      { nutrient: "Protein",       per100g: "22 g"     },
      { nutrient: "Fat",           per100g: "54 g"     },
      { nutrient: "Carbohydrates", per100g: "18 g"     },
      { nutrient: "Fiber",         per100g: "12 g"     },
      { nutrient: "Calcium",       per100g: "264 mg"   }
    ],
    tags: ["almonds", "mamra", "irani", "ayurveda", "premium"],
    weight: 250,
    origin: "Iran",
    inStock: true,
    featured: true
  },

  // ── 5. Afghani Walnuts (Halves) ───────────────────────────────────────────
  {
    id: "bf-005",
    slug: "afghani-walnuts-halves",
    name: "Afghani Walnuts — Halves",
    category: "walnuts",
    price: 449,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1609671058819-72c7c9f2faf0?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 449,  sku: "BF-WLN-250",  inStock: true  },
      { label: "500g",  price: 849,  sku: "BF-WLN-500",  inStock: true  },
      { label: "1kg",   price: 1599, sku: "BF-WLN-1KG",  inStock: true  }
    ],
    badge: null,
    shortDescription: "Light-coloured Afghani walnut halves with thin shells and exceptional omega-3 content.",
    longDescription: "Sourced from the mountainous valleys of Afghanistan, these walnut halves are prized for their pale golden colour, paper-thin shells, and rich, complex flavour. Unlike darker varieties, light-coloured walnuts are lower in tannins — a milder, less bitter taste. Each walnut half is manually selected, intact, unbroken, and free from any rancidity. Packed with omega-3 fatty acids, antioxidants, and polyphenols.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "654 kcal" },
      { nutrient: "Protein",       per100g: "15 g"     },
      { nutrient: "Fat",           per100g: "65 g"     },
      { nutrient: "Carbohydrates", per100g: "14 g"     },
      { nutrient: "Fiber",         per100g: "7 g"      },
      { nutrient: "Omega-3",       per100g: "9 g"      }
    ],
    tags: ["walnuts", "omega-3", "brain-health", "premium", "afghani"],
    weight: 250,
    origin: "Afghanistan",
    inStock: true,
    featured: true
  },

  // ── 6. Chilean Walnuts (In-Shell) ─────────────────────────────────────────
  {
    id: "bf-006",
    slug: "chilean-walnuts-in-shell",
    name: "Chilean Walnuts — In Shell",
    category: "walnuts",
    price: 349,
    originalPrice: 429,
    rating: 4.4,
    reviewCount: 63,
    images: [
      "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1609671058819-72c7c9f2faf0?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 349,  sku: "BF-CHW-250",  inStock: true  },
      { label: "500g",  price: 649,  sku: "BF-CHW-500",  inStock: true  },
      { label: "1kg",   price: 1199, sku: "BF-CHW-1KG",  inStock: true  }
    ],
    badge: "Sale",
    shortDescription: "Fresh Chilean walnuts sold in shell — crack-and-eat freshness guaranteed.",
    longDescription: "Imported from the fertile walnut-growing regions of Chile, these in-shell walnuts are the freshest way to enjoy this superfood. The unbroken shell acts as nature's packaging, locking in the natural oils and preventing oxidation. Breaking them yourself ensures you always get the freshest kernel possible.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "650 kcal" },
      { nutrient: "Protein",       per100g: "15 g"     },
      { nutrient: "Fat",           per100g: "64 g"     },
      { nutrient: "Carbohydrates", per100g: "14 g"     },
      { nutrient: "Fiber",         per100g: "7 g"      },
      { nutrient: "Magnesium",     per100g: "158 mg"   }
    ],
    tags: ["walnuts", "in-shell", "fresh", "sale", "chilean"],
    weight: 250,
    origin: "Chile",
    inStock: true,
    featured: false
  },

  // ── 7. Seedless Black Raisins ─────────────────────────────────────────────
  {
    id: "bf-007",
    slug: "seedless-black-raisins",
    name: "Seedless Black Raisins",
    category: "raisins",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1596591868231-05e808fd3f93?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1564206268695-0ab4c8a0cc78?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 199,  sku: "BF-BKR-250",  inStock: true  },
      { label: "500g",  price: 369,  sku: "BF-BKR-500",  inStock: true  },
      { label: "1kg",   price: 699,  sku: "BF-BKR-1KG",  inStock: true  }
    ],
    badge: "Sale",
    shortDescription: "Juicy seedless black raisins sun-dried naturally — packed with iron and antioxidants.",
    longDescription: "Our seedless black raisins come from the vineyards of Nashik, India's premier grape-growing region. Naturally sun-dried over three to four weeks with no artificial colours, sulphites, or preservatives, they develop their characteristic deep black colour and intensely sweet, tangy flavour. High in iron, potassium, and antioxidants — an Ayurvedic staple.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "299 kcal" },
      { nutrient: "Protein",       per100g: "3 g"      },
      { nutrient: "Fat",           per100g: "0.5 g"    },
      { nutrient: "Carbohydrates", per100g: "79 g"     },
      { nutrient: "Fiber",         per100g: "4 g"      },
      { nutrient: "Iron",          per100g: "1.8 mg"   }
    ],
    tags: ["raisins", "iron", "antioxidants", "nashik", "sale"],
    weight: 250,
    origin: "Nashik, India",
    inStock: true,
    featured: false
  },

  // ── 8. Golden Raisins (Kishmish) ─────────────────────────────────────────
  {
    id: "bf-008",
    slug: "golden-raisins-kishmish",
    name: "Golden Raisins — Kishmish",
    category: "raisins",
    price: 179,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 88,
    images: [
      "https://images.unsplash.com/photo-1564206268695-0ab4c8a0cc78?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1596591868231-05e808fd3f93?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 179,  sku: "BF-GRN-250",  inStock: true  },
      { label: "500g",  price: 329,  sku: "BF-GRN-500",  inStock: true  },
      { label: "1kg",   price: 599,  sku: "BF-GRN-1KG",  inStock: false }
    ],
    badge: null,
    shortDescription: "Small, plump golden kishmish raisins — ideal for baking, biryanis, and trail mixes.",
    longDescription: "Kishmish, the classic Indian golden raisin, is made from small, oval, seedless grapes and is a staple in traditional Indian sweets, biryanis, and halwas. Our golden raisins are lightly sun-dried to retain a soft, plump texture and a balanced sweet-tart flavour.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "298 kcal" },
      { nutrient: "Protein",       per100g: "3 g"      },
      { nutrient: "Fat",           per100g: "0.3 g"    },
      { nutrient: "Carbohydrates", per100g: "79 g"     },
      { nutrient: "Fiber",         per100g: "3.7 g"    },
      { nutrient: "Potassium",     per100g: "744 mg"   }
    ],
    tags: ["raisins", "kishmish", "baking", "golden", "indian"],
    weight: 250,
    origin: "Sangli, India",
    inStock: true,
    featured: false
  },

  // ── 9. Medjool Dates ─────────────────────────────────────────────────────
  {
    id: "bf-009",
    slug: "medjool-dates",
    name: "Medjool Dates — King of Dates",
    category: "dates",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1593358278257-2ca1b23773ac?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 599,  sku: "BF-MJD-250",  inStock: true  },
      { label: "500g",  price: 1099, sku: "BF-MJD-500",  inStock: true  },
      { label: "1kg",   price: 1999, sku: "BF-MJD-1KG",  inStock: true  }
    ],
    badge: "Bestseller",
    shortDescription: "Large, soft Medjool dates from Jordan — caramel-sweet, moist, and naturally energising.",
    longDescription: "The Medjool date is widely considered the finest variety of date in the world. Grown in the fertile valleys of Jordan under optimal desert conditions, our Medjool dates are harvested by hand at perfect ripeness. Exceptionally large, with a soft, creamy flesh and a complex caramel-honey sweetness. A 2–3 date portion delivers a powerful burst of natural energy — the perfect pre-workout snack.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "277 kcal" },
      { nutrient: "Protein",       per100g: "2 g"      },
      { nutrient: "Fat",           per100g: "0.2 g"    },
      { nutrient: "Carbohydrates", per100g: "75 g"     },
      { nutrient: "Fiber",         per100g: "7 g"      },
      { nutrient: "Potassium",     per100g: "696 mg"   }
    ],
    tags: ["dates", "medjool", "energy", "natural-sugar", "bestseller"],
    weight: 250,
    origin: "Jordan",
    inStock: true,
    featured: true
  },

  // ── 10. Ajwa Dates ───────────────────────────────────────────────────────
  {
    id: "bf-010",
    slug: "ajwa-dates",
    name: "Ajwa Dates — Madina Special",
    category: "dates",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 201,
    images: [
      "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1593358278257-2ca1b23773ac?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 899,  sku: "BF-AJW-250",  inStock: true  },
      { label: "500g",  price: 1699, sku: "BF-AJW-500",  inStock: true  },
      { label: "1kg",   price: 3199, sku: "BF-AJW-1KG",  inStock: false }
    ],
    badge: "New",
    shortDescription: "Premium Ajwa dates from Madina — the rarest, most revered date in the world.",
    longDescription: "Ajwa dates are exclusively grown in and around Al-Madina Al-Munawwarah in Saudi Arabia, making them among the rarest and most prized dates in existence. Their distinctive dark colour, soft fudge-like texture, and bittersweet flavour set them apart. Revered in Islamic tradition and valued in nutritional science for their impressive concentration of polyphenols and antioxidants.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "282 kcal" },
      { nutrient: "Protein",       per100g: "2.4 g"    },
      { nutrient: "Fat",           per100g: "0.4 g"    },
      { nutrient: "Carbohydrates", per100g: "73 g"     },
      { nutrient: "Fiber",         per100g: "8 g"      },
      { nutrient: "Antioxidants",  per100g: "High"     }
    ],
    tags: ["dates", "ajwa", "madina", "premium", "antioxidants"],
    weight: 250,
    origin: "Madina, Saudi Arabia",
    inStock: true,
    featured: true
  },

  // ── 11. BreakFit Power Mix ───────────────────────────────────────────────
  {
    id: "bf-011",
    slug: "breakfit-power-mix",
    name: "BreakFit Power Mix",
    category: "mixed-nuts",
    price: 499,
    originalPrice: 599,
    rating: 4.7,
    reviewCount: 276,
    images: [
      "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1554136209-4f5d1c4d2d3c?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 499,  sku: "BF-PWR-250",  inStock: true  },
      { label: "500g",  price: 949,  sku: "BF-PWR-500",  inStock: true  },
      { label: "1kg",   price: 1799, sku: "BF-PWR-1KG",  inStock: true  }
    ],
    badge: "Bestseller",
    shortDescription: "A power-packed blend of cashews, almonds, walnuts, and raisins — our best-selling daily mix.",
    longDescription: "The BreakFit Power Mix is our flagship product and top-seller. We combine premium W320 cashews, raw California almonds, Afghani walnut halves, and sweet black raisins in a perfectly balanced ratio designed for maximum nutritional benefit and snacking satisfaction. This mix delivers a complete nutritional profile with healthy fats, protein, fibre, vitamins, and minerals in every handful.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "560 kcal" },
      { nutrient: "Protein",       per100g: "16 g"     },
      { nutrient: "Fat",           per100g: "48 g"     },
      { nutrient: "Carbohydrates", per100g: "28 g"     },
      { nutrient: "Fiber",         per100g: "6 g"      },
      { nutrient: "Sodium",        per100g: "8 mg"     }
    ],
    tags: ["mixed-nuts", "blend", "cashews", "almonds", "walnuts", "raisins", "bestseller"],
    weight: 250,
    origin: "India (Blended)",
    inStock: true,
    featured: true
  },

  // ── 12. Healthy Heart Mix ────────────────────────────────────────────────
  {
    id: "bf-012",
    slug: "healthy-heart-mix",
    name: "Healthy Heart Mix",
    category: "mixed-nuts",
    price: 549,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 134,
    images: [
      "https://images.unsplash.com/photo-1554136209-4f5d1c4d2d3c?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 549,  sku: "BF-HHM-250",  inStock: true  },
      { label: "500g",  price: 1049, sku: "BF-HHM-500",  inStock: true  },
      { label: "1kg",   price: 1999, sku: "BF-HHM-1KG",  inStock: true  }
    ],
    badge: "Organic",
    shortDescription: "A heart-health focused blend of walnuts, almonds, and dates — certified organic, zero additives.",
    longDescription: "Crafted with cardiovascular wellness in mind, the Healthy Heart Mix brings together three superfoods renowned for heart protection. Omega-3 rich Afghani walnuts, antioxidant-packed raw almonds, and naturally sweet Medjool date pieces combine to create a nourishing blend that satisfies your sweet-and-savoury cravings. Every ingredient is certified organic, free from pesticides and artificial flavours.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "545 kcal" },
      { nutrient: "Protein",       per100g: "14 g"     },
      { nutrient: "Fat",           per100g: "46 g"     },
      { nutrient: "Carbohydrates", per100g: "32 g"     },
      { nutrient: "Fiber",         per100g: "8 g"      },
      { nutrient: "Omega-3",       per100g: "4 g"      }
    ],
    tags: ["mixed-nuts", "organic", "heart-health", "walnuts", "almonds", "dates"],
    weight: 250,
    origin: "India (Blended)",
    inStock: true,
    featured: false
  },

  // ── 13. Cashew & Almond Premium Gift Box ─────────────────────────────────
  {
    id: "bf-013",
    slug: "cashew-almond-gift-box",
    name: "Cashew & Almond Premium Gift Box",
    category: "mixed-nuts",
    price: 999,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 56,
    images: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "400g",  price: 999,  sku: "BF-GBX-400",  inStock: false },
      { label: "800g",  price: 1799, sku: "BF-GBX-800",  inStock: false },
      { label: "1.5kg", price: 3099, sku: "BF-GBX-1500", inStock: false }
    ],
    badge: "Sale",
    shortDescription: "Elegant festival gift box with premium cashews and almonds — perfect for Diwali and Eid.",
    longDescription: "Present the gift of health with our handsome festival gift box — a handcrafted wooden-finish box housing layers of premium W320 cashews and raw California almonds. Designed for festivals, weddings, and corporate gifting. Currently out of stock — restocking before the next festive season.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "565 kcal" },
      { nutrient: "Protein",       per100g: "19 g"     },
      { nutrient: "Fat",           per100g: "47 g"     },
      { nutrient: "Carbohydrates", per100g: "26 g"     },
      { nutrient: "Fiber",         per100g: "8 g"      },
      { nutrient: "Sodium",        per100g: "10 mg"    }
    ],
    tags: ["mixed-nuts", "gift", "festival", "cashews", "almonds", "diwali", "eid"],
    weight: 400,
    origin: "India (Blended)",
    inStock: false,
    featured: false
  },

  // ── 14. Organic Dates & Raisin Mix ───────────────────────────────────────
  {
    id: "bf-014",
    slug: "organic-dates-raisin-mix",
    name: "Organic Dates & Raisin Mix",
    category: "mixed-nuts",
    price: 349,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 43,
    images: [
      "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1596591868231-05e808fd3f93?w=600&h=600&fit=crop&q=90",
      "https://images.unsplash.com/photo-1593358278257-2ca1b23773ac?w=600&h=600&fit=crop&q=90"
    ],
    variants: [
      { label: "250g",  price: 349,  sku: "BF-DRM-250",  inStock: false },
      { label: "500g",  price: 649,  sku: "BF-DRM-500",  inStock: false },
      { label: "1kg",   price: 1199, sku: "BF-DRM-1KG",  inStock: false }
    ],
    badge: "Organic",
    shortDescription: "A sweet, energy-rich organic blend of Medjool date pieces and sun-dried black raisins.",
    longDescription: "This certified organic mix pairs succulent Medjool date pieces with plump Nashik black raisins for a naturally sweet, caramel-fruity snack with no added sugar. Both ingredients are certified organic, cold-pressed, and free from sulphites. Currently being restocked with fresh harvest — back soon.",
    nutritionFacts: [
      { nutrient: "Calories",      per100g: "290 kcal" },
      { nutrient: "Protein",       per100g: "2.5 g"    },
      { nutrient: "Fat",           per100g: "0.4 g"    },
      { nutrient: "Carbohydrates", per100g: "76 g"     },
      { nutrient: "Fiber",         per100g: "6 g"      },
      { nutrient: "Iron",          per100g: "2.1 mg"   }
    ],
    tags: ["mixed-nuts", "organic", "dates", "raisins", "no-sugar-added"],
    weight: 250,
    origin: "India (Blended)",
    inStock: false,
    featured: false
  }
];
