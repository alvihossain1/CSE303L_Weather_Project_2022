const { application } = require("express")
// ADMIN PANEL 
const express = require("express")
const router = express.Router()
const mysql = require("mysql")


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "WeatherDB"
})

db.connect(function(err) {
    if (err) throw err;
});



// CREATING DATABASE weatherdb
router.get("/createDB", (req, res)=>{
    let sql = "CREATE DATABASE weatherdb"
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send("Hello Admin, Database has been Created")         
    })
})

// CREATING TABLE userlist
router.get("/CT_userlist", (req, res)=>{
    let sql = "CREATE TABLE userlist(id int AUTO_INCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), contact_number VARCHAR(50), gender CHAR(10), date_Of_Birth DATE, address TEXT(255), city VARCHAR(30), zip int, password VARCHAR(100), PRIMARY KEY (id));"
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send("Hello Admin, User Table has been Created")         
    })
})

module.exports = router

