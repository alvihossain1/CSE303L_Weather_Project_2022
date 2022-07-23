const express = require("express")
const router = express()


router.get("/", (req, res) => {
    res.render("index.ejs")
})

router.get("/about", (req, res) => {
    const text = "This is my new website duh!"
    res.render("about.ejs", {text})
})

router.get("/maps", (req, res) => {
    res.render("maps.ejs")
})

router.get("/signup", (req, res) => { 
    let cities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Mymensingh", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
    res.render("signup.ejs", {cities})
})

router.get("/report", (req, res) => {
    let report = "This is my report please take good care of it! How is the report baby?"    
    res.render("report.ejs", {report})
})


module.exports = router