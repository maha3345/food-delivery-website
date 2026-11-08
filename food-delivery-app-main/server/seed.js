// Seed script to add food items to the database
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import Food from './models/foodModel.js';
import fs from 'fs';
import path from 'path';

const foodItems = [
  { name: "Greek Salad", description: "A refreshing mix of cucumbers, tomatoes, olives, and feta cheese with a light olive oil dressing.", price: 299, category: "Salad", image: "greek_salad.jpg" },
  { name: "Caesar Salad", description: "Crisp romaine lettuce tossed with parmesan, croutons, and classic Caesar dressing.", price: 179, category: "Salad", image: "caesar_salad.jpg" },
  { name: "Veg Salad", description: "A healthy blend of seasonal vegetables with herbs and tangy lemon vinaigrette.", price: 149, category: "Salad", image: "veg_salad.jpg" },
  { name: "Chicken Rolls", description: "Juicy spiced chicken wrapped in soft flatbread with fresh veggies and mint chutney.", price: 159, category: "Rolls", image: "food_7.png" },
  { name: "Paneer Rolls", description: "Grilled paneer tikka with onions and peppers, wrapped in a warm paratha.", price: 149, category: "Rolls", image: "food_6.png" },
  { name: "Egg Rolls", description: "Crispy egg-filled rolls with crunchy onions and a spicy sauce.", price: 129, category: "Rolls", image: "egg_rolls.jpg" },
  { name: "Gulab Jamun", description: "Soft and spongy milk-solid balls soaked in warm rose-flavored sugar syrup.", price: 99, category: "Deserts", image: "gulab_jamun.jpg" },
  { name: "Rasmalai", description: "Creamy cottage cheese dumplings in chilled sweetened milk flavored with cardamom.", price: 129, category: "Deserts", image: "ras_malai.jpg" },
  { name: "Ice Cream Sundae", description: "Rich vanilla ice cream topped with chocolate sauce, nuts, and a cherry.", price: 149, category: "Deserts", image: "ice_cream_sundae.jpg" },
  { name: "Veg Sandwich", description: "Fresh multigrain bread loaded with grilled veggies, cheese, and herb mayo.", price: 119, category: "Sandwich", image: "food_15.png" },
  { name: "Club Sandwich", description: "Triple-decker sandwich with chicken, bacon, lettuce, tomato, and mayo.", price: 169, category: "Sandwich", image: "food_14.png" },
  { name: "Paneer Sandwich", description: "Toasted sandwich with spiced paneer, capsicum, and melted cheese.", price: 139, category: "Sandwich", image: "paneer_sandwich.jpg" },
  { name: "Chocolate Cake", description: "Rich and moist dark chocolate cake with creamy ganache frosting.", price: 249, category: "Cake", image: "chocolate_cake.jpg" },
  { name: "Red Velvet Cake", description: "Classic red velvet cake with smooth cream cheese frosting.", price: 279, category: "Cake", image: "red_velvet_cake.jpg" },
  { name: "Butterscotch Cake", description: "Delicious butterscotch-flavored sponge cake topped with crunchy praline.", price: 229, category: "Cake", image: "butterscotch_cake.jpg" },
  { name: "Palak Paneer", description: "Creamy spinach gravy with soft cottage cheese cubes, served with roti.", price: 199, category: "Pure Veg", image: "palak_paneer.jpg" },
  { name: "Dal Makhani", description: "Slow-cooked black lentils in a rich, buttery tomato-cream gravy.", price: 179, category: "Pure Veg", image: "dal_makhani.jpg" },
  { name: "Paneer Butter Masala", description: "Soft paneer cubes in a velvety tomato-cashew gravy with a hint of cream.", price: 219, category: "Pure Veg", image: "paneer_butter_masala.jpg" },
  { name: "Penne Arrabiata", description: "Penne pasta in a spicy tomato sauce with garlic, chili flakes, and fresh basil.", price: 199, category: "Pasta", image: "penne_arrabiata.jpg" },
  { name: "White Sauce Pasta", description: "Creamy white sauce pasta with mushrooms, corn, and a touch of herbs.", price: 189, category: "Pasta", image: "food_27.png" },
  { name: "Alfredo Pasta", description: "Classic fettuccine tossed in a rich parmesan cream sauce.", price: 219, category: "Pasta", image: "alfredo_pasta.jpg" },
  { name: "Hakka Noodles", description: "Stir-fried noodles with crunchy vegetables and soy sauce.", price: 149, category: "Noodles", image: "hakka_noodles.jpg" },
  { name: "Schezwan Noodles", description: "Spicy Schezwan-flavored noodles tossed with vegetables and chili paste.", price: 159, category: "Noodles", image: "schezwan_noodles.jpg" },
  { name: "Chow Mein", description: "Crispy fried noodles with mixed vegetables in a savory brown sauce.", price: 169, category: "Noodles", image: "chow_mein.jpg" },
  { name: "Tandoori Paneer Tikka", description: "Marinated cottage cheese cubes grilled to perfection with bell peppers.", price: 229, category: "Pure Veg", image: "paneer_tikka.jpg" },
  { name: "Paneer Butter Kulcha", description: "Soft stuffed kulcha served with creamy paneer butter gravy and pickled onions.", price: 199, category: "Pure Veg", image: "paneer_kulcha.jpg" },
  { name: "Veg Biryani Feast", description: "Fragrant basmati rice layered with vegetables and aromatic spices.", price: 249, category: "Pure Veg", image: "veg_biryani.jpg" },
  { name: "Crispy Veg Burger", description: "Golden crispy vegetable patty with fresh lettuce and spicy mayo.", price: 129, category: "Sandwich", image: "veg_burger.jpg" },
  { name: "Mango Cheesecake", description: "Rich baked cheesecake topped with fresh mango coulis.", price: 219, category: "Cake", image: "food_20.png" },
  { name: "Chili Garlic Noodles", description: "Wok-tossed noodles in fiery chili garlic sauce with bell peppers.", price: 169, category: "Noodles", image: "chili_garlic_noodles.jpg" },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected for seeding");
    
    await sequelize.sync({ alter: true });
    
    // Check if food items already exist
    const count = await Food.count();
    if (count > 0) {
      console.log(`Database already has ${count} food items. Skipping seed.`);
      process.exit(0);
    }

    // Insert all food items
    await Food.bulkCreate(foodItems);
    console.log(`Successfully seeded ${foodItems.length} food items!`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
