import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export let categories = [
  { name: "Healthy", color: "red" },
  { name: "Hamburger", color: "pink" },
  { name: "Pizza", color: "yellow" },
  { name: "Italian", color: "orange" },
];

const cheeseBurger = {
  name: "Cheese burger",
  color: "",
  time: "15 minutes",
  dif: "Simple",
  price: "Affordable",
  img: require("../assets/Food_Image/Cheeseburger-74e8cde.jpg"),
  id: "cheeseBurger",
  ingredients: [],
  recipe: ["Step 1: "],
};

const pepperonisPizza = {
  name: "Pepperonis Pizza",
  color: "",
  time: "3 Hours",
  dif: "Expert",
  price: "Affordable",
  img: require("../assets/Food_Image/PeppPizza.jpg"),
  id: "pepperonisPizza",
  ingredients: [],
  recipe: ["Step 1: "],
};

const chickenSalad = {
  name: "Chicken Salad",
  color: "",
  time: "30 minutes",
  dif: "Simple",
  price: "Affordable",
  img: require("../assets/Food_Image/Grilled-Chicken-Salad-Featured-Image.jpg"),
  id: "chickenSalad",
  ingredients: [
    "Chicken: Thighs, Breast",
    "Celery",
    "Green Onion",
    "Parsley",
    "Tarragon",
    "Cherry Tomato",
    "Mayonnaise",
    "Dijon Mustard",
    "Red Grapes",
    "Toasted Almonds",
    "Lemon Juice",
    "Salt and Pepper",
  ],
  recipe: [
    "Step 1: Toast: Lightly toast the almonds in a pan on the stove. Let them cool completely to room temperature.",
    "Step 2: Slice and Dice: Dice up your chicken breasts into small pieces. Then, quarter the grapes, dice the celery, parsley and tarragon, and slice the green onion.",
    "Step 3: Mix: Add all the ingredients to a large bowl and mix everything together until it’s well combined. Season with a bit of salt and pepper",
  ],
};

const spaghettiBolognese = {
  name: "Spaghetti bolognese",
  color: "",
  time: "23 Mins",
  dif: "Intermediate",
  price: "Affordable",
  img: require("../assets/Food_Image/Spaghetti.jpg"),
  id: "spaghettiBolognese",
  ingredients: [],
  recipe: ["Step 1: "],
};

export const allMeals = [
  cheeseBurger,
  pepperonisPizza,
  chickenSalad,
  spaghettiBolognese,
];

export const mealList = [
  {
    name: "Healthy",
    items: [chickenSalad],
  },
  {
    name: "Pizza",
    items: [pepperonisPizza],
  },
  {
    name: "Hamburger",
    items: [cheeseBurger],
  },
  {
    name: "Italian",
    items: [pepperonisPizza, spaghettiBolognese],
  },
];

// chickenSalad = {name...} pizza = {name, color, ...} italy = [chickenSalad, ...]
export const color = {
  lightGreen: "#a5ffe1",
  white: "#f5ffff",
  lightBlue: "#00BFFF",
  yellow: "#fcbf49",
  orange: "#f77f00",
  blackBlue: "#003049",
  grey: "#e6e6e6",
  cyan: "#50B0C8",
  blue: "#0284C8",
  lightGrey: "#f5f5f5",
  darkGrey: "#a3a3a3",
};

export const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem("myKey", JSON.stringify(value));
  } catch (e) {
    console.log("saving error");
  }
};
