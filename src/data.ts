/* ──────────────────────────────────────────────────────────────────
   PIZZERIA BISTRO — SINGLE SOURCE OF TRUTH
   ──────────────────────────────────────────────────────────────────
   AUTHENTICITY POLICY (per site rules):
   • VERIFIED facts are filled in below (name, address, business
     type, Google rating ≈ 4.2 / 5 reviews per supplied research).
   • UNVERIFIED fields are intentionally left EMPTY so the UI
     automatically hides the related actions instead of showing
     fabricated information. The restaurant owner can paste the
     official values here — no other code changes needed:
       - social profile URLs      → enables social links
       - instagram/facebook/tiktok → enables social links
       - openingHours            → enables the hours row
   • Phone, WhatsApp and menu prices below are verified from the
     restaurant menu artwork supplied by the owner.
   • IMAGES: real food photography used as illustration. Swap any
     URL in the IMAGES section with verified photos of Pizzeria
     Bistro's actual food/premises when available.
   ────────────────────────────────────────────────────────────────── */

const Q = encodeURIComponent("Pizzeria Bistro Mandi Bahauddin");

export const BUSINESS = {
  name: "Pizzeria Bistro",
  tagline: "Slice of Happiness",
  website: "https://pizzeriabistro.pk/",
  urduAccent: "گرم ، تازہ ، مزیدار", // hot, fresh, delicious

  // VERIFIED — Google Business profile address
  address: {
    short: "Qainchi Mor, Old Rasul Road",
    full: "Qainchi Mor, Old Rasul Road, near Nabeel Hospital, Jani Mohalla, Shadman Town, Mandi Bahauddin, 50400, Pakistan",
    landmark: "near Nabeel Hospital",
    area: "Jani Mohalla, Shadman Town",
    city: "Mandi Bahauddin",
    postalCode: "50400",
    country: "Pakistan",
  },

  // VERIFIED business type → dine-in & takeaway, pizza & fast food
  services: ["Dine-In", "Takeaway", "Free Home Delivery"] as const,
  cuisine: ["Pizza", "Fast Food"] as const,

  // From supplied research: ~4.2 rating from 5 Google reviews
  rating: { value: 4.2, count: 5, source: "Google" },

  // VERIFIED from the supplied official menu artwork.
  phone: "+92 337 925 6200",
  whatsapp: "", // The menu confirms phone ordering, not WhatsApp.
  openingHours: "", // Add only when the restaurant confirms its hours.
  socials: {
    instagram: "", // e.g. "https://instagram.com/…"
    facebook: "",  // e.g. "https://facebook.com/…"
    tiktok: "",    // e.g. "https://tiktok.com/@…"
  },

  // Real, working links derived from the VERIFIED name + address
  links: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(
        "Pizzeria Bistro, Qainchi Mor, Old Rasul Road, Mandi Bahauddin 50400, Pakistan"
      ),
    googleProfile: `https://www.google.com/search?q=${Q}`,
    mapEmbed: `https://www.google.com/maps?q=${Q}&z=16&output=embed`,
  },
};

/* ──────────────────────────────────────────────────────────────────
   IMAGES — swap with verified Pizzeria Bistro photos when available.
   `px(id, w)` builds a sized, compressed URL (Pexels CDN).
   ────────────────────────────────────────────────────────────────── */
const px = (id: number, w = 1200, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }`;

export const IMG = {
  heroPizza: px(6488933, 1400),        // pepperoni + green chilli, black backdrop
  showcaseSlice: px(30343606, 900),    // margherita cheese pull
  showcaseBurger: px(6850423, 900),    // crispy chicken burger on black
  showcasePizza: px(6488931, 900),     // overhead pizza w/ cutter
  showcaseShawarma: px(5779364, 900),  // grilled shawarma wrap
  showcaseMargherita: px(18437684, 900), // wood-fired margherita
  showcaseFries: px(16444399, 900),    // cheesy fries
  aboutOven: px(18126715, 1300),       // pizzas baking, wood-fired oven
  aboutStone: px(32293382, 800),       // stone oven
  aboutFlame: px(1878346, 800),        // oven flames
  offerPizza: px(13373035, 1000),      // rustic pizza close-up
};

/* ──────────────────────────────────────────────────────────────────
   MENU — transcribed from the official menu screenshots supplied by
   the restaurant owner. No descriptions or unlisted prices added.
   ────────────────────────────────────────────────────────────────── */
export type MenuSize = { label: string; price: number };
export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  img: string;
  imgW?: number;
  price?: number;        // single-price items
  sizes?: MenuSize[];    // sized items (pizzas)
  tag?: string;          // neutral flavour descriptor
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const mi = (id: string, name: string, img: string, price?: number, sizes?: MenuSize[]): MenuItem => ({
  id,
  name,
  desc: "",
  img,
  price,
  sizes,
});

const stock = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900`;

const regular = (cheese = false): MenuSize[] => cheese
  ? [{ label: "S", price: 449 }, { label: "M", price: 749 }, { label: "L", price: 1149 }, { label: "F", price: 1549 }]
  : [{ label: "S", price: 499 }, { label: "M", price: 799 }, { label: "L", price: 1199 }, { label: "F", price: 1599 }];
const stuffed: MenuSize[] = [{ label: "M", price: 999 }, { label: "L", price: 1349 }, { label: "F", price: 1799 }];
const special: MenuSize[] = [{ label: "M", price: 999 }, { label: "L", price: 1399 }, { label: "F", price: 1899 }];

export const MENU: MenuCategory[] = [
  {
    id: "regular-pizza",
    label: "Regular Pizza",
    items: [
      mi("r-supreme", "Chicken Supreme", stock(4617831), undefined, regular()),
      mi("r-tikka", "Chicken Tikka", stock(9792460), undefined, regular()),
      mi("r-fajita", "Chicken Fajita", stock(35940570), undefined, regular()),
      mi("r-bbq", "BBQ Pizza", stock(19239118), undefined, regular()),
      mi("r-cheese", "Cheese Lover", "/images/cheese-lover-pizza.jpg", undefined, regular(true)),
      mi("r-tandoori", "Tandoori Pizza", "/images/tandoori-pizza.jpg", undefined, regular()),
      mi("r-achari", "Achari Pizza", "/images/achari-pizza.jpg", undefined, regular()),
    ],
  },
  {
    id: "stuffed-pizza",
    label: "Stuffed Pizza",
    items: [
      mi("st-kabab", "Kabab Stuff", "/images/kabab-stuffed-pizza.jpg", undefined, stuffed),
      mi("st-chicken", "Chicken Stuff", "/images/chicken-stuffed-pizza.jpg", undefined, stuffed),
      mi("st-cheese", "Cheese Stuff", "/images/cheese-stuffed-pizza.jpg", undefined, stuffed),
      mi("st-chicken-cheese", "Chicken Cheese Stuff", "/images/chicken-cheese-stuffed-pizza.jpg", undefined, stuffed),
    ],
  },
  {
    id: "special-pizza",
    label: "Special Pizza",
    items: [
      mi("sp-house", "Pizzeria Special", stock(11111603), undefined, special),
      mi("sp-crown", "Crown Crust", "/images/crown-crust-pizza.jpg", undefined, special),
      mi("sp-malai", "Malai Boti", "/images/malai-boti-pizza.jpg", undefined, special),
      mi("sp-creamy", "Creamy Pizza", "/images/creamy-special-pizza.jpg", undefined, special),
      mi("sp-kababish", "Kababish", "https://images.pexels.com/photos/26341212/pexels-photo-26341212.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", undefined, special),
    ],
  },
  {
    id: "detroit",
    label: "Detroit Square",
    items: [
      mi("dt-tikka", "Detroit Tikka", "https://images.pexels.com/photos/15550302/pexels-photo-15550302.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 1199),
      mi("dt-fajita", "Detroit Fajita", "https://images.pexels.com/photos/35940570/pexels-photo-35940570.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 1199),
      mi("dt-malai", "Malai Boti Detroit", "https://images.pexels.com/photos/6147817/pexels-photo-6147817.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 1199),
      mi("dt-creamy", "Creamy Pizza", "/images/creamy-special-pizza.jpg", 1199),
    ],
  },
  {
    id: "burgers",
    label: "Burgers & Sando",
    items: [
      mi("b-house", "Pizzeria Special Burger", "https://images.pexels.com/photos/12129480/pexels-photo-12129480.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 549),
      mi("b-special-zinger", "Special Zinger Burger", "https://images.pexels.com/photos/5474640/pexels-photo-5474640.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 399),
      mi("b-zinger", "Regular Zinger Burger", "https://images.pexels.com/photos/20722058/pexels-photo-20722058.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 349),
      mi("b-grilled", "Grilled Burger", "https://images.pexels.com/photos/31450816/pexels-photo-31450816.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 349),
      mi("b-patty", "Patty Burger", stock(32807693), 299),
      mi("b-fillet", "Chicken Fillet Burger", "https://images.pexels.com/photos/13522852/pexels-photo-13522852.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 399),
      mi("b-sando", "Pizzeria Special Sando", "https://images.pexels.com/photos/17569017/pexels-photo-17569017.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900", 649),
    ],
  },
  {
    id: "wings",
    label: "Wings & Nuggets",
    items: [
      mi("w-garlic", "Garlic Mayo Wings (6 pcs)", stock(29631422), 349),
      mi("w-oven", "Oven Baked Wings (6 pcs)", stock(5946434), 399),
      mi("w-crispy", "Crispy Wings (6 pcs)", stock(5946433), 349),
      mi("w-peri", "Peri Peri Wings (6 pcs)", stock(5946431), 349),
      mi("nuggets", "Nuggets", stock(8696468), undefined, [{ label: "6 pcs", price: 349 }, { label: "12 pcs", price: 599 }]),
    ],
  },
  {
    id: "wraps",
    label: "Shawarma & Rolls",
    items: [
      mi("sh-special", "Pizzeria Special Shawarma", stock(6416559), 399),
      mi("sh-chicken", "Chicken Shawarma", stock(29306501), 249),
      mi("sh-platter", "Platter Shawarma", stock(29285458), 499),
      mi("roll-chicken", "Chicken Paratha Roll", stock(29306507), 299),
      mi("roll-zinger", "Zinger Paratha Roll", stock(10361459), 299),
      mi("roll-wrap", "Zinger Wrap Roll", stock(29306506), 349),
      mi("roll-spin", "Spin Roll", stock(12737663), 299),
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    items: [
      mi("sand-grilled", "Grilled Sandwich", stock(29747752), 449),
      mi("sand-bbq", "BBQ Sandwich", stock(17569017), 449),
      mi("sand-special", "Pizzeria Special Sandwich", stock(16845752), 549),
    ],
  },
  {
    id: "sides",
    label: "Sides & Pasta",
    items: [
      mi("lf-pizza", "Pizza Loaded Fries / Special", stock(29285461), 649),
      mi("lf-zinger", "Zinger Loaded Fries", stock(20003232), 599),
      mi("lf-bbq", "BBQ Loaded Fries", stock(29285460), 649),
      mi("cheese-bite", "Cheese Bite", stock(11400977), undefined, [{ label: "S", price: 399 }, { label: "M", price: 699 }, { label: "L", price: 999 }]),
      mi("cheese-stick", "Cheese Stick", stock(9951852), undefined, [{ label: "S", price: 399 }, { label: "M", price: 699 }, { label: "L", price: 999 }]),
      mi("pasta-special", "Special Pasta", stock(34363091), 699),
      mi("pasta-pizza", "Pizza Pasta", stock(29039086), 599),
      mi("fries-mayo", "Mayo Fries", stock(15801054), 299),
      mi("fries-crinkle", "Crinkle Fries", stock(15801054), undefined, [{ label: "S", price: 150 }, { label: "L", price: 250 }]),
      mi("fries-plain", "Plain Fries", stock(32986485), undefined, [{ label: "S", price: 150 }, { label: "L", price: 250 }]),
    ],
  },
  {
    id: "addons",
    label: "Add Ons",
    items: [
      mi("add-garlic", "Garlic Mayo", stock(32986486), 60),
      mi("add-special", "Special Sauce", stock(6428247), 70),
      mi("add-cheese", "Cheese Slice", stock(8743918), 50),
      mi("add-topping", "Extra Topping", stock(29039071), 100),
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [mi("drink-mint", "Mint Margarita", stock(5041558), 150)],
  },
  {
    id: "deals",
    label: "Pizza Deals",
    items: [
      mi("deal-large", "Large Pizza + 1 Litre Drink", stock(29039068), 1099),
      mi("deal-medium", "Medium Pizza + 500 ml Drink", stock(29039077), 799),
      mi("deal-small", "Small Pizza + Zinger Burger + 500 ml Drink", stock(19709548), 899),
      mi("deal-burgers", "3 Zinger Burgers + 1 Litre Drink", stock(20003229), 1149),
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
   GALLERY — categorised by image CONTENT (never claimed as photos of
   the actual premises). Replace with verified photos when available.
   ────────────────────────────────────────────────────────────────── */
export type GalleryShot = { src: string; alt: string; cat: "food" | "kitchen" | "moments"; tall?: boolean };

export const GALLERY: GalleryShot[] = [
  { src: px(30343606, 800), alt: "Margherita pizza slice lifted with a long cheese pull", cat: "moments", tall: true },
  { src: px(6488933, 900), alt: "Pepperoni pizza with green chillies on a dark background", cat: "food" },
  { src: px(18126715, 900), alt: "Pizzas baking inside a wood-fired oven", cat: "kitchen" },
  { src: px(6850423, 800), alt: "Crispy chicken burger with lettuce and cheese", cat: "food", tall: true },
  { src: px(5779364, 900), alt: "Grilled shawarma wrap sliced in half", cat: "food" },
  { src: px(16444399, 800), alt: "Cheesy French fries with dips", cat: "food" },
  { src: px(1878346, 900), alt: "Flames inside a traditional pizza oven", cat: "kitchen", tall: true },
  { src: px(27491017, 800), alt: "Hand pulling stretchy cheese from a pizza slice", cat: "moments", tall: true },
  { src: px(13062441, 900), alt: "Garlic bread served with a dip", cat: "food" },
  { src: px(32293382, 900), alt: "Pizza baking in a stone oven", cat: "kitchen" },
  { src: px(6605219, 800), alt: "Hand holding a fresh pizza slice with basil", cat: "moments" },
  { src: px(19102880, 800), alt: "Margherita pizza with basil on marble, overhead", cat: "food", tall: true },
];

/* helpers */
export const rs = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
export const minPrice = (i: MenuItem) => i.price ?? Math.min(...(i.sizes ?? []).map((s) => s.price));
