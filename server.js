const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect (
    mongodb+srv://tomharker3_db_user:6a1cad5ac657806e7aabc113@cluster0.j7xxxvn.mongodb.net/?appName=mongosh+2.8.3
);

const userSchema = new mongoose.Schema({
    email: string,
    password: string
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(validPassword) {
        res.json({ message: "Login successful" });
    } else {
        res.json({ message: "Invalid password" });
    }
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});