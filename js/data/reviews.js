/**
 * BreakFit — Review Data
 * js/data/reviews.js
 *
 * Loaded via <script> tag (no bundler). Exposes window.REVIEWS globally.
 * Contains 3–5 reviews for each of the 6 core product IDs:
 *   bf-001 (Premium W320 Cashews)
 *   bf-002 (Roasted & Salted Cashews)
 *   bf-003 (California Almonds — Raw)
 *   bf-004 (Mamra Almonds)
 *   bf-005 (Afghani Walnuts — Halves)
 *   bf-006 (Chilean Walnuts — In Shell)
 *
 * Review schema:
 *   id        {string}  — unique identifier e.g. "rv-001"
 *   productId {string}  — references a product id e.g. "bf-001"
 *   author    {string}  — realistic Indian name
 *   avatar    {string}  — picsum.photos seeded URL
 *   rating    {number}  — integer 1–5
 *   title     {string}  — short review headline
 *   body      {string}  — 2–3 sentences of realistic review text
 *   date      {string}  — ISO 8601 date string
 *   verified  {boolean} — whether this is a verified purchase
 */

const REVIEWS = [

  // ─────────────────────────────────────────────────────────────────────────
  // bf-001 — Premium W320 Cashews  (5 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-001",
    productId: "bf-001",
    author: "Priya Nambiar",
    avatar: "https://picsum.photos/seed/user1/80/80",
    rating: 5,
    title: "Best cashews I've ever tasted!",
    body: "These W320 cashews are absolutely fresh and full-sized — nothing like the broken pieces you get at the supermarket. The buttery flavour comes through with every bite, and you can tell they haven't been sitting on a shelf for months. I've already placed my second order and recommended them to my entire family.",
    date: "2024-10-12T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-002",
    productId: "bf-001",
    author: "Karthik Subramaniam",
    avatar: "https://picsum.photos/seed/user2/80/80",
    rating: 5,
    title: "Premium quality, exactly as described",
    body: "Ordered the 1 kg pack and was genuinely impressed by the consistency in size and colour — every single cashew is whole and evenly shaped. The natural sweetness is wonderful without any artificial taste. Great value for the quality you're getting compared to local stores.",
    date: "2024-09-28T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-003",
    productId: "bf-001",
    author: "Sneha Agarwal",
    avatar: "https://picsum.photos/seed/user3/80/80",
    rating: 4,
    title: "Freshness is unbeatable",
    body: "The packaging was secure and the cashews arrived fresh with a satisfying crunch. I use these in both cooking and as a daily snack, and they perform beautifully in kheer and stir-fries. Deducting one star only because delivery took a day longer than expected, but the product itself is top-notch.",
    date: "2024-09-05T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-004",
    productId: "bf-001",
    author: "Ramesh Pillai",
    avatar: "https://picsum.photos/seed/user4/80/80",
    rating: 5,
    title: "My kids refuse all other cashews now",
    body: "Since I started ordering from BreakFit, my children won't eat any other brand of cashews. The difference in freshness and flavour is immediately noticeable — creamy, rich, and not overly oily. These have become a household staple and I buy the 500g pack every month.",
    date: "2024-08-20T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-005",
    productId: "bf-001",
    author: "Ananya Krishnaswamy",
    avatar: "https://picsum.photos/seed/user5/80/80",
    rating: 4,
    title: "Great for cooking and snacking both",
    body: "I ordered these specifically for making cashew butter and they blended into a smooth, flavourful paste beautifully. The high oil content you'd expect from W320 grade is clearly there. Would love a slightly larger 2 kg bulk option in the future.",
    date: "2024-07-31T00:00:00.000Z",
    verified: false
  },

  // ─────────────────────────────────────────────────────────────────────────
  // bf-002 — Roasted & Salted Cashews  (4 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-006",
    productId: "bf-002",
    author: "Vikram Mehta",
    avatar: "https://picsum.photos/seed/user6/80/80",
    rating: 5,
    title: "The perfect party snack",
    body: "Opened the bag and the aroma of fresh roasting hit me immediately — this is clearly done in small batches and not mass-produced. The Himalayan salt adds just the right savoury kick without overpowering the nuttiness. My guests couldn't stop eating these at our gathering last weekend.",
    date: "2024-10-08T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-007",
    productId: "bf-002",
    author: "Divya Menon",
    avatar: "https://picsum.photos/seed/user7/80/80",
    rating: 4,
    title: "Perfectly roasted, not over-salted",
    body: "Many roasted cashews on the market are either under-cooked or drowned in salt — these strike exactly the right balance. The crunch is satisfying and consistent throughout the bag. I'd rate it 5 stars if the 500g pack were a little more competitively priced.",
    date: "2024-09-14T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-008",
    productId: "bf-002",
    author: "Sundar Rajan",
    avatar: "https://picsum.photos/seed/user8/80/80",
    rating: 5,
    title: "No oil coating — genuinely dry roasted",
    body: "I specifically wanted oil-free roasted cashews and these deliver on that promise — no greasy residue on your hands after eating. The roasting is even and thorough, giving them a deep golden colour and a nutty depth that raw cashews simply lack. Will definitely reorder.",
    date: "2024-08-27T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-009",
    productId: "bf-002",
    author: "Meenakshi Iyer",
    avatar: "https://picsum.photos/seed/user9/80/80",
    rating: 4,
    title: "Great everyday snack, fresh batch",
    body: "These are my desk snack and I've gone through three 250g bags this month alone — which tells you everything about how good they are. The salt level is mild and pleasant, not the aggressive kind you find in gas-station snacks. Consistently good quality with each order.",
    date: "2024-07-19T00:00:00.000Z",
    verified: true
  },

  // ─────────────────────────────────────────────────────────────────────────
  // bf-003 — California Almonds — Raw  (5 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-010",
    productId: "bf-003",
    author: "Pooja Sharma",
    avatar: "https://picsum.photos/seed/user10/80/80",
    rating: 5,
    title: "Genuinely organic, taste the difference",
    body: "I've been buying organic almonds for years and these are the freshest, plumpest ones I've ever received online. They soaked beautifully overnight — the skin slips off easily and the kernel inside is sweet and milky. The organic certification gives me peace of mind for my children's daily snack.",
    date: "2024-10-15T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-011",
    productId: "bf-003",
    author: "Abhishek Tiwari",
    avatar: "https://picsum.photos/seed/user11/80/80",
    rating: 5,
    title: "Perfect for my pre-workout routine",
    body: "I eat 10 soaked almonds every morning before the gym and these have become non-negotiable in my routine. The protein and healthy fat content keep me fuelled without feeling heavy. The quality is very consistent across bags — same size, same freshness every time.",
    date: "2024-09-22T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-012",
    productId: "bf-003",
    author: "Nandini Kulkarni",
    avatar: "https://picsum.photos/seed/user12/80/80",
    rating: 4,
    title: "Great for almond milk too",
    body: "I use these to make fresh homemade almond milk and the yield and flavour are fantastic — far better than store-bought varieties. The almonds are fat and uniform in size, which tells you they're quality sorted. Delivery was prompt and packaging kept them completely fresh.",
    date: "2024-09-01T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-013",
    productId: "bf-003",
    author: "Harish Balan",
    avatar: "https://picsum.photos/seed/user13/80/80",
    rating: 5,
    title: "Vitamin E powerhouse, feel the difference in weeks",
    body: "My dermatologist recommended raw almonds for my skin and hair health, and after a month of eating these daily I can honestly say I've noticed an improvement. The almonds themselves taste clean and fresh with none of the slightly bitter aftertaste you get from older stock. Excellent sourcing.",
    date: "2024-08-10T00:00:00.000Z",
    verified: false
  },
  {
    id: "rv-014",
    productId: "bf-003",
    author: "Saraswati Bhat",
    avatar: "https://picsum.photos/seed/user14/80/80",
    rating: 4,
    title: "Solid quality at a fair price",
    body: "Compared to other premium almond brands I've tried, BreakFit offers noticeably better freshness at a similar price point. The bag was vacuum-sealed and the almonds inside were dry and crunchy with no sign of moisture. Good everyday quality that I'll keep coming back to.",
    date: "2024-07-25T00:00:00.000Z",
    verified: true
  },

  // ─────────────────────────────────────────────────────────────────────────
  // bf-004 — Mamra Almonds (Irani)  (4 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-015",
    productId: "bf-004",
    author: "Zareen Farooqui",
    avatar: "https://picsum.photos/seed/user15/80/80",
    rating: 5,
    title: "Authentic Mamra — I finally found them online!",
    body: "I grew up eating genuine Mamra almonds my grandmother would bring back from Iran, and for years I couldn't find the real thing online — everything was either California almonds being sold as Mamra or low-quality fakes. These are the genuine article: small, oily, intensely flavoured. Absolutely worth the premium price.",
    date: "2024-10-03T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-016",
    productId: "bf-004",
    author: "Dr. Rohit Joshi",
    avatar: "https://picsum.photos/seed/user16/80/80",
    rating: 5,
    title: "Ayurvedic gold — follow the soaking ritual",
    body: "As someone who follows Ayurvedic diet principles closely, Mamra almonds soaked overnight and consumed on an empty stomach is a daily ritual that has noticeably improved my energy and mental clarity over the past two months. The oil content of these is superior to any Mamra I've bought before. Highly recommend.",
    date: "2024-09-17T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-017",
    productId: "bf-004",
    author: "Fatima Ansari",
    avatar: "https://picsum.photos/seed/user17/80/80",
    rating: 5,
    title: "Perfect Ramadan gifting option",
    body: "I bought two 500g packs as gifts during Ramadan and the recipients were absolutely delighted — Mamra almonds are considered very auspicious and premium. The presentation and freshness of the product made it a wonderful and thoughtful gift. Will definitely order again for Eid.",
    date: "2024-08-05T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-018",
    productId: "bf-004",
    author: "Girish Hegde",
    avatar: "https://picsum.photos/seed/user18/80/80",
    rating: 4,
    title: "Worth every rupee for the quality",
    body: "Yes, Mamra almonds are expensive, but the nutritional density and flavour complexity justify the price completely. These ones are clearly fresh stock with that characteristic oily sheen and rich, complex aroma. My only minor point is I'd appreciate a resealable zipper pouch to keep them fresh after opening.",
    date: "2024-07-14T00:00:00.000Z",
    verified: true
  },

  // ─────────────────────────────────────────────────────────────────────────
  // bf-005 — Afghani Walnuts — Halves  (5 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-019",
    productId: "bf-005",
    author: "Laila Hussain",
    avatar: "https://picsum.photos/seed/user19/80/80",
    rating: 5,
    title: "Light colour, mild flavour — exactly what I wanted",
    body: "I specifically researched light-coloured Afghani walnuts because I wanted low-tannin variety for my kids who find regular walnuts too bitter. These are exactly that — pale, mildly flavoured, and almost sweet. My kids eat them with no complaints, which is a miracle for walnuts. Huge win.",
    date: "2024-10-11T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-020",
    productId: "bf-005",
    author: "Sanjay Kulkarni",
    avatar: "https://picsum.photos/seed/user20/80/80",
    rating: 5,
    title: "Omega-3 snacking done right",
    body: "I started eating a handful of walnuts daily on my cardiologist's recommendation, and these Afghani halves make that habit genuinely enjoyable rather than a chore. They're meaty, fresh, and snappy with no musty smell that sometimes accompanies older walnut stock. I've been reordering every three weeks.",
    date: "2024-09-29T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-021",
    productId: "bf-005",
    author: "Rekha Inamdar",
    avatar: "https://picsum.photos/seed/user21/80/80",
    rating: 4,
    title: "Excellent for baking and cooking",
    body: "These walnut halves fold beautifully into brownies and banana bread without any bitterness overpowering the dessert. The pieces stay whole and give a satisfying textural bite. Subtracted one star because a small number of pieces were quarter-broken, but the overall quality is very good.",
    date: "2024-09-08T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-022",
    productId: "bf-005",
    author: "Deepak Verma",
    avatar: "https://picsum.photos/seed/user22/80/80",
    rating: 5,
    title: "No rancidity — stored these for months",
    body: "I purchased the 1 kg pack which took me about six weeks to finish, storing the rest in an airtight container in the fridge. Not a single walnut went rancid or developed any off-taste over that period — a real testament to the freshness at the time of packing. Will continue to buy in bulk.",
    date: "2024-08-22T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-023",
    productId: "bf-005",
    author: "Kavitha Reddy",
    avatar: "https://picsum.photos/seed/user23/80/80",
    rating: 5,
    title: "Best walnuts I've found online in India",
    body: "I've tried at least five other online walnut brands and none match the colour, size, and freshness of these Afghani halves. The paper-thin shell absence means you get maximum kernel for your money. Terrific brain-food snack that I look forward to every afternoon.",
    date: "2024-07-30T00:00:00.000Z",
    verified: false
  },

  // ─────────────────────────────────────────────────────────────────────────
  // bf-006 — Chilean Walnuts — In Shell  (3 reviews)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rv-024",
    productId: "bf-006",
    author: "Anil Sawant",
    avatar: "https://picsum.photos/seed/user24/80/80",
    rating: 5,
    title: "Crack-fresh taste is absolutely worth it",
    body: "There's no comparison between cracking a walnut fresh and eating pre-shelled ones — the aroma and flavour difference is remarkable. These Chilean shells are thin and crack cleanly without shattering into a hundred pieces. The kernels inside are pale, moist, and flavourful every single time. A wonderful experience.",
    date: "2024-10-06T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-025",
    productId: "bf-006",
    author: "Usha Nair",
    avatar: "https://picsum.photos/seed/user25/80/80",
    rating: 4,
    title: "Great gifting option during Diwali",
    body: "Bought two 1 kg bags as a Diwali gift and they were received with great enthusiasm — there's something wonderfully old-fashioned and special about gifting in-shell nuts. The shells were clean and unbroken and the walnuts inside tasted very fresh. Good sale price made this even better value.",
    date: "2024-09-18T00:00:00.000Z",
    verified: true
  },
  {
    id: "rv-026",
    productId: "bf-006",
    author: "Prakash Deshpande",
    avatar: "https://picsum.photos/seed/user26/80/80",
    rating: 4,
    title: "Authentic flavour, sturdy shells",
    body: "These in-shell walnuts are consistently sized and the shells crack easily with a standard nut cracker. I appreciate that nature's own packaging keeps them completely fresh — you can taste the difference versus packaged walnut pieces. A small tip: store them in a cool, dry place and they'll stay good for weeks.",
    date: "2024-08-14T00:00:00.000Z",
    verified: true
  }

];

window.REVIEWS = REVIEWS;
