const express = require("express")
const router = express()
const fs = require("fs")


router.get("/", (req, res) => {
    res.render("baseHTMLpages/index.ejs")
})

router.get("/about", (req, res) => {    
    let text = "This is my new website duh!"
    res.render("baseHTMLpages/about.ejs", {text})
})

router.get("/maps", (req, res) => {
    res.render("baseHTMLpages/maps.ejs")
})

router.get("/signup", (req, res) => { 
    let cities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Mymensingh", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
    res.render("baseHTMLpages/signup.ejs", {cities})
})

router.get("/report", (req, res) => {
    let report = "This is my report please take good care of it! How is the report baby?"    
    res.render("baseHTMLpages/report.ejs", {report})
})


module.exports = router