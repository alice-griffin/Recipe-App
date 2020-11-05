const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {

    try {
        let { email, password, passwordCheck, displayName } = req.body;

        //validation

        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Not all fields have been entered" });
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password needs to be at least 8 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Passwords did not match." })
        }

        //check if email already exists and check if there is a display name

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ msg: "Account with this email already exists." });
        }
        if (!displayName) {
            displayName = email; 
        }

        //password hashing using bcrypt

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);
        const newUser = new User ({
            email,
            password: passHash,
            displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate email and password

        if(!email || !password) {
            return res.status(400).json({msg: "One or more fields missing"});
        }
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({msg: "No account with this email exists."});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({msg: "Invalid credentials."});
        }

        //sign json webtoken that tells frontend we are logged in

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }
        return res.json(true);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
//get a currently logged in user, to use on frontend
router.get("/", auth, async (req, res) => {
    const user = User.findById(req.user);
    res.json({displayName: user.displayName, id: user._id});
})

module.exports = router;