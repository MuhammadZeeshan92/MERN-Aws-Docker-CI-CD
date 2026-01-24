// Mock data for products and categories

import jwellery1 from "../assets/1.jpeg";
import jwellery2 from "../assets/2.jpeg";
import jwellery3 from "../assets/3.jpeg";
import jwellery4 from "../assets/4.jpeg";
import jwellery5 from "../assets/5.jpeg";
import jwellery6 from "../assets/6.jpeg";
import jwellery7 from "../assets/7.jpeg";
import jwellery8 from "../assets/8.jpeg";
import jwellery9 from "../assets/9.jpeg";
import jwellery10 from "../assets/10.jpeg";
import jwellery11 from "../assets/11.jpeg";
import jwellery12 from "../assets/12.jpeg";
import jwellery13 from "../assets/13.jpeg";
import jwellery14 from "../assets/14.jpeg";
import jwellery15 from "../assets/15.jpeg";
import jwellery16 from "../assets/16.jpeg";
import jwellery17 from "../assets/17.jpeg";
import jwellery18 from "../assets/18.jpeg";
import jwellery19 from "../assets/19.jpeg";
import jwellery20 from "../assets/20.jpeg";
import jwellery21 from "../assets/21.jpeg";
import jwellery22 from "../assets/22.jpeg";
import jwellery23 from "../assets/23.jpeg";
import jwellery24 from "../assets/24.jpeg";
import jwellery25 from "../assets/25.jpeg";
import jwellery26 from "../assets/26.jpeg";
import jwellery27 from "../assets/27.jpeg";
import jwellery28 from "../assets/28.jpeg";
import jwellery29 from "../assets/29.jpeg";
import jwellery30 from "../assets/30.jpeg";
import jwellery31 from "../assets/31.jpeg";
import jwellery32 from "../assets/32.jpeg";
import jwellery33 from "../assets/33.jpeg";
import jwellery34 from "../assets/34.jpeg";

export const categories = [
  { id: 1, name: "Bracelets" },
  { id: 2, name: "Earrings" },
  { id: 3, name: "Stud Earrings" },
  { id: 4, name: "Jhumkas" },
  { id: 5, name: "Hair Accessories" },
];

export const products = [
  { id: 1, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.5, image: jwellery1, inStock: true },
  { id: 2, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.7, image: jwellery2, inStock: true },
  { id: 3, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.3, image: jwellery3, inStock: true },
  { id: 4, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.6, image: jwellery4, inStock: true },
  { id: 5, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.4, image: jwellery5, inStock: true },

  { id: 6, name: "Flower Ear rings", price: 300, category: "Earrings", categoryId: 2, rating: 4.8, image: jwellery6, inStock: true },
  { id: 7, name: "Flower Ear rings", price: 300, category: "Earrings", categoryId: 2, rating: 4.5, image: jwellery7, inStock: true },
  { id: 8, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery8, inStock: true },
  { id: 9, name: "Flower Ear rings", price: 300, category: "Earrings", categoryId: 2, rating: 4.6, image: jwellery9, inStock: true },
  { id: 10, name: "Flower Ear rings", price: 300, category: "Earrings", categoryId: 2, rating: 4.4, image: jwellery10, inStock: true },

  { id: 13, name: "Ear rings studs", price: 350, category: "Stud Earrings", categoryId: 3, rating: 4.3, image: jwellery13, inStock: true },
  { id: 14, name: "Ear rings", price: 300, category: "Earrings", categoryId: 2, rating: 4.4, image: jwellery14, inStock: true },

  { id: 15, name: "Hair Catchers", price: 350, category: "Hair Accessories", categoryId: 5, rating: 4.5, image: jwellery15, inStock: true },
  { id: 16, name: "Hair Catchers", price: 350, category: "Hair Accessories", categoryId: 5, rating: 4.6, image: jwellery16, inStock: true },

  { id: 17, name: "Ear rings minimilistic", price: 400, category: "Earrings", categoryId: 2, rating: 4.7, image: jwellery17, inStock: true },
  { id: 18, name: "Ear rings minimilistic", price: 400, category: "Earrings", categoryId: 2, rating: 4.4, image: jwellery18, inStock: true },
  { id: 19, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.5, image: jwellery19, inStock: true },

  { id: 20, name: "Big jhumka", price: 350, category: "Jhumkas", categoryId: 4, rating: 4.2, image: jwellery20, inStock: true },
  { id: 21, name: "Hair Catchers", price: 350, category: "Hair Accessories", categoryId: 5, rating: 4.2, image: jwellery21, inStock: true },
  { id: 22, name: "Ear rings / Studs", price: 350, category: "Stud Earrings", categoryId: 3, rating: 4.2, image: jwellery22, inStock: true },

  { id: 23, name: "Ear rings minimilistic", price: 400, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery23, inStock: true },
  { id: 24, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery24, inStock: true },
  { id: 25, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery25, inStock: true },

  { id: 26, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery26, inStock: true },
  { id: 27, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery27, inStock: true },

  { id: 28, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.2, image: jwellery28, inStock: true },
  { id: 29, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.2, image: jwellery29, inStock: true },
  { id: 30, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.2, image: jwellery30, inStock: true },

  { id: 31, name: "Ear rings", price: 250, category: "Earrings", categoryId: 2, rating: 4.2, image: jwellery31, inStock: true },
  { id: 32, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.2, image: jwellery32, inStock: true },

  { id: 33, name: "Small jhumka", price: 300, category: "Jhumkas", categoryId: 4, rating: 4.2, image: jwellery33, inStock: true },
  { id: 34, name: "Bracelet", price: 400, category: "Bracelets", categoryId: 1, rating: 4.2, image: jwellery34, inStock: true },
];
