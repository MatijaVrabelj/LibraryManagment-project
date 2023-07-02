const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");//rješava problem dekrpicije passworda
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");


//Ovdje kreiran prvi API koji sadrži registraciju novoga korisnika, te također i brisanje korisnika
//Register a new user
router.post("/register", async (req, res) => {
    try {
        //chech if user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "Email already exists",
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //create new user
        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: "User created successfully, please login!",
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


//login user
router.post("/login", async (req, res) => {
    try {
        //check if user exists!
        const user = await User.findOne({ email: req.body.email });//ovdje se pretražuje jel korinik postoji, a način identifikacije je pomoću email-a
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        //check if password is correct!
        const validPassword = await bcrypt.compare(
            req.body.password,//plain password
            user.password //encrypted password
        );
        //kreira se token, ali ako password nije točan šalje se poruka da je krivo
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }
        //create and assign a token - dodjeljuje token koji je kriran s porukom success
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });//prvi parametar je podatak koji se kriptira, a drugi je podatak je tajni kod koji se mora podudarati sa dekripcijski mtajnim kodom. 
        //(64 linija)-> userId je user koji smo deklarirali na početku koda
        return res.send({
            success: true,
            message: "Login successful",
            data: token,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

//get logged in user details
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userIdFromToken);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        return res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,

        });
    } catch (error) {
        return res.send({
            success: false,
            message: error,
        });
    }
});

//GET ALL THE USERS (patrons/studenti)
router.get("/get-all-users/:role", authMiddleware, async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role }).sort({
            createdAt: -1,
        });
        return res.send({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});


//GET USER BY ID
router.get("/get-user-by-id/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: 'User does not exist',
        });
    }
});
module.exports = router;