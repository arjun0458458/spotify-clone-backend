 const userModel = require("../models/user.model");
 const jwt = require("jsonwebtoken"); // to create a token
 const bcrypt = require("bcryptjs");


 async function registerUser(req, res) {

    const { username, email, password, role = "user" } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [                 // Used $or as it will check condition as one of them exist or not
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10); //TO convert password in hashing. Here 10 is salt which help in delay secruity breach time


    //Now create a User
    const user  = await userModel.create({
        username,
        email,
        password: hash,
        role
    })
    

    const token = jwt.sign({
        id: user._id,  // must maintain a one unique thing in token
        role: user.role,
    }, process.env.JWT_SECRET)



    // Now set token in cookies
    res.cookie("token", token)


    res.status(201).json({
        message:"User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

 }

//Create Login Controllers
 async function loginUser(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        // During login or will look for any one in email and username
        //
        $or: [       
            {username},
            {email}
        ]
    })

    if(!user){         //if not found any one between email&username
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    //Now to check password (IN Copy info)
    const isPasswordValid = await bcrypt.compare(password, user.password)//user.pass data is come from database


    if(!isPasswordValid) {
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    //Now create a token
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)// set token in cookies

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

 }


 //Create Logout Controllers
 async function logoutUser (req, res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })
 }



 module.exports = {registerUser, loginUser, logoutUser};
 