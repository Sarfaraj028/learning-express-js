const express = require('express')
const {body, validationResult} = require('express-validator')

const router = express.Router();

router.get("/register", (req, res) =>{
    res.render("register")
})
router.post("/register",
    body('email').trim().isEmail().isLength({min: 12}),
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min: 3}),
    (req, res) =>{

        const error = validationResult(req)

        if(!error.isEmpty){
            return res.status(400).json({
                error: error.array(),
                messgae: "Invalid data"
            })
        }
        res.send("REgistered")
    
})

module.exports = router