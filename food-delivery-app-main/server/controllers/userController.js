import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";



const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}


// login user
const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = createToken(user.id);
    res.json({ success: true, token })

  }

  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }

}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {

    // checking is user already exist
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const nameParts = (name || "").trim().split(" ");
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const user = await User.create({
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    });

    const token = createToken(user.id)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, phone, street, city, state, zipcode, country, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const updates = {};
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (firstName !== undefined || lastName !== undefined) {
      const f = firstName !== undefined ? firstName : (user.firstName || "");
      const l = lastName !== undefined ? lastName : (user.lastName || "");
      updates.name = (f + " " + l).trim() || user.name;
    }
    if (phone !== undefined) updates.phone = phone;
    if (street !== undefined) updates.street = street;
    if (city !== undefined) updates.city = city;
    if (state !== undefined) updates.state = state;
    if (zipcode !== undefined) updates.zipcode = zipcode;
    if (country !== undefined) updates.country = country;

    // Check if user wants to change password
    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 8) {
        return res.json({ success: false, message: "New password must be at least 8 characters long" });
      }
      if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.json({ success: false, message: "Current password is incorrect" });
        }
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    await user.update(updates);

    const safeUser = user.toJSON();
    delete safeUser.password;

    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Error updating profile" });
  }
};

export { loginUser, registerUser, getUserProfile, updateUserProfile };
