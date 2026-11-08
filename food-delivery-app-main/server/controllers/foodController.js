import Food from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
  
  // Check if file was uploaded
  if (!req.file) {
    return res.json({ success: false, message: "No image file uploaded" });
  }

  let image_filname = `${req.file.filename}`;

  try {
    await Food.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filname
    });
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    // If database save fails, clean up the uploaded file
    if (req.file && req.file.filename) {
      fs.unlink(`uploads/${req.file.filename}`, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }
    res.json({ success: false, message: "Error adding food item" })
  }

}

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => { });
    await food.destroy();
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}



export { addFood, listFood, removeFood }
