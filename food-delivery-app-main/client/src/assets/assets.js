import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: menu_1
    },
    {
        menu_name: "Rolls",
        menu_image: menu_2
    },
    {
        menu_name: "Deserts",
        menu_image: menu_3
    },
    {
        menu_name: "Sandwich",
        menu_image: menu_4
    },
    {
        menu_name: "Cake",
        menu_image: menu_5
    },
    {
        menu_name: "Pure Veg",
        menu_image: menu_6
    },
    {
        menu_name: "Pasta",
        menu_image: menu_7
    },
    {
        menu_name: "Noodles",
        menu_image: menu_8
    }
]

export const food_list = [
  { id: 1, _id: "1", name: "Greek Salad", description: "A refreshing mix of cucumbers, tomatoes, olives, and feta cheese with a light olive oil dressing.", price: 299, category: "Salad", image: "greek_salad.jpg" },
  { id: 2, _id: "2", name: "Caesar Salad", description: "Crisp romaine lettuce tossed with parmesan, croutons, and classic Caesar dressing.", price: 179, category: "Salad", image: "caesar_salad.jpg" },
  { id: 3, _id: "3", name: "Veg Salad", description: "A healthy blend of seasonal vegetables with herbs and tangy lemon vinaigrette.", price: 149, category: "Salad", image: "veg_salad.jpg" },
  { id: 4, _id: "4", name: "Chicken Rolls", description: "Juicy spiced chicken wrapped in soft flatbread with fresh veggies and mint chutney.", price: 159, category: "Rolls", image: "food_7.png" },
  { id: 5, _id: "5", name: "Paneer Rolls", description: "Grilled paneer tikka with onions and peppers, wrapped in a warm paratha.", price: 149, category: "Rolls", image: "food_6.png" },
  { id: 6, _id: "6", name: "Egg Rolls", description: "Crispy egg-filled rolls with crunchy onions and a spicy sauce.", price: 129, category: "Rolls", image: "egg_rolls.jpg" },
  { id: 7, _id: "7", name: "Gulab Jamun", description: "Soft and spongy milk-solid balls soaked in warm rose-flavored sugar syrup.", price: 99, category: "Deserts", image: "gulab_jamun.jpg" },
  { id: 8, _id: "8", name: "Rasmalai", description: "Creamy cottage cheese dumplings in chilled sweetened milk flavored with cardamom.", price: 129, category: "Deserts", image: "ras_malai.jpg" },
  { id: 9, _id: "9", name: "Ice Cream Sundae", description: "Rich vanilla ice cream topped with chocolate sauce, nuts, and a cherry.", price: 149, category: "Deserts", image: "ice_cream_sundae.jpg" },
  { id: 10, _id: "10", name: "Veg Sandwich", description: "Fresh multigrain bread loaded with grilled veggies, cheese, and herb mayo.", price: 119, category: "Sandwich", image: "food_15.png" },
  { id: 11, _id: "11", name: "Club Sandwich", description: "Triple-decker sandwich with chicken, bacon, lettuce, tomato, and mayo.", price: 169, category: "Sandwich", image: "food_14.png" },
  { id: 12, _id: "12", name: "Paneer Sandwich", description: "Toasted sandwich with spiced paneer, capsicum, and melted cheese.", price: 139, category: "Sandwich", image: "paneer_sandwich.jpg" },
  { id: 13, _id: "13", name: "Chocolate Cake", description: "Rich and moist dark chocolate cake with creamy ganache frosting.", price: 249, category: "Cake", image: "chocolate_cake.jpg" },
  { id: 14, _id: "14", name: "Red Velvet Cake", description: "Classic red velvet cake with smooth cream cheese frosting.", price: 279, category: "Cake", image: "red_velvet_cake.jpg" },
  { id: 15, _id: "15", name: "Butterscotch Cake", description: "Delicious butterscotch-flavored sponge cake topped with crunchy praline.", price: 229, category: "Cake", image: "butterscotch_cake.jpg" },
  { id: 16, _id: "16", name: "Palak Paneer", description: "Creamy spinach gravy with soft cottage cheese cubes, served with roti.", price: 199, category: "Pure Veg", image: "palak_paneer.jpg" },
  { id: 17, _id: "17", name: "Dal Makhani", description: "Slow-cooked black lentils in a rich, buttery tomato-cream gravy.", price: 179, category: "Pure Veg", image: "dal_makhani.jpg" },
  { id: 18, _id: "18", name: "Paneer Butter Masala", description: "Soft paneer cubes in a velvety tomato-cashew gravy with a hint of cream.", price: 219, category: "Pure Veg", image: "paneer_butter_masala.jpg" },
  { id: 19, _id: "19", name: "Penne Arrabiata", description: "Penne pasta in a spicy tomato sauce with garlic, chili flakes, and fresh basil.", price: 199, category: "Pasta", image: "penne_arrabiata.jpg" },
  { id: 20, _id: "20", name: "White Sauce Pasta", description: "Creamy white sauce pasta with mushrooms, corn, and a touch of herbs.", price: 189, category: "Pasta", image: "food_27.png" },
  { id: 21, _id: "21", name: "Alfredo Pasta", description: "Classic fettuccine tossed in a rich parmesan cream sauce.", price: 219, category: "Pasta", image: "alfredo_pasta.jpg" },
  { id: 22, _id: "22", name: "Hakka Noodles", description: "Stir-fried noodles with crunchy vegetables and soy sauce.", price: 149, category: "Noodles", image: "hakka_noodles.jpg" },
  { id: 23, _id: "23", name: "Schezwan Noodles", description: "Spicy Schezwan-flavored noodles tossed with vegetables and chili paste.", price: 159, category: "Noodles", image: "schezwan_noodles.jpg" },
  { id: 24, _id: "24", name: "Chow Mein", description: "Crispy fried noodles with mixed vegetables in a savory brown sauce.", price: 169, category: "Noodles", image: "chow_mein.jpg" },
  { id: 25, _id: "25", name: "Tandoori Paneer Tikka", description: "Marinated cottage cheese cubes grilled to perfection with bell peppers.", price: 229, category: "Pure Veg", image: "paneer_tikka.jpg" },
  { id: 26, _id: "26", name: "Paneer Butter Kulcha", description: "Soft stuffed kulcha served with creamy paneer butter gravy and pickled onions.", price: 199, category: "Pure Veg", image: "paneer_kulcha.jpg" },
  { id: 27, _id: "27", name: "Veg Biryani Feast", description: "Fragrant basmati rice layered with vegetables and aromatic spices.", price: 249, category: "Pure Veg", image: "veg_biryani.jpg" },
  { id: 28, _id: "28", name: "Crispy Veg Burger", description: "Golden crispy vegetable patty with fresh lettuce and spicy mayo.", price: 129, category: "Sandwich", image: "veg_burger.jpg" },
  { id: 29, _id: "29", name: "Mango Cheesecake", description: "Rich baked cheesecake topped with fresh mango coulis.", price: 219, category: "Cake", image: "food_20.png" },
  { id: 30, _id: "30", name: "Chili Garlic Noodles", description: "Wok-tossed noodles in fiery chili garlic sauce with bell peppers.", price: 169, category: "Noodles", image: "chili_garlic_noodles.jpg" },
];
