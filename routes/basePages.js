const express = require("express")
const router = express()
const fs = require("fs")
const { dirname } = require("path")
const path = require("path")

// var pathObj = path.parse(__filename)
// console.log(pathObj)
// console.log(path.basename(__dirname))
// console.log(path.dirname(""))



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

router.get("/graphs", (req, res) => {
    let report = "This is the graph section"    
    res.render("baseHTMLpages/graphs.ejs", {report})
})


module.exports = router