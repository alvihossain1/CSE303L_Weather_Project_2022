// ADMIN PANEL 
const { application } = require("express")
const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const csvtojson = require("csvtojson")

const base_dirname = __dirname.replace("\\routes", "")

const csv = require("csv-parser")
const fs = require("fs")
const results = []

// BODY PARSER -- CHECKS
const bodyParser = require("body-parser")
// const {check, validationResult} = require("express-validator")
const urlencodedParser = bodyParser.urlencoded({exteded: false})

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "WeatherDB"
})

db.connect(function(err) {
    if (err) throw err;
});


// IMPORTS
const { nextTick } = require("process")
const multerUpload = require("../server.js")
const { check } = require("express-validator")
const { dirname } = require("path")
const { create } = require("domain")


// Middleware set
router.use(urlencodedParser)
router.use(multerUpload.single("csvfile"))

// CUSTOM ADMIN LOGIN DETAILS
const adminEmail = "admin@yahoo.com"
const adminPass = "12345"




// --------------------------------------------------------------------------------------------------- //


router.get("/", (req, res)=>{
    let message = "Enter Email and Password"
    res.render("x_adminPages/adminLogin.ejs", {message})
})

// POST === HANDLING ALL POST REQUESTS BY CHECKS = Which checks the params
router.post("/", (req, res, next)=>{
    let checkParams = Object.keys(req.body)
    console.log(checkParams)
    console.log(req)

    if(checkParams[0] === "email" && checkParams[1] === "password"){
        loginVerify(req, res, next)
    }    
    else if(req.file.fieldname === "csvfile"){ //Multer
        if(req.file.mimetype === "text/csv"){
            csvRead(req, res)
        }
        else{
            res.render("x_adminPages/adminHome.ejs", {message : "Select a csv file", uploadContent: ""})
        }
    }
    
    

})

// LOGIN VERIFICATION
function loginVerify(req, res, next){
    let email = req.body.email
    let pass = req.body.password

    if(email === adminEmail && pass === adminPass){
        res.render("x_adminPages/adminHome.ejs")
        next()        
    }
    else{
        let message = "Incorrect Email or Password"
        res.render("x_adminPages/adminLogin.ejs", {message})
    }
}


// INSERTING DATA INTO SQL
function instertingDataSQL(createTableQuery, insertIntoQuery){
    db.query(createTableQuery, (err, result)=>{
        if(err) throw err;
        console.log(result) 
    })
    
    for(let i = 0; i < insertIntoQuery.length; i++){
        db.query(insertIntoQuery[i], (err, result)=>{
            if(err) throw err;
            console.log(result) 
        })
    }
   

}


// CREATING TABLE AND INSERTING DATA SQL QUERY LINES --- DOESN'T INSERT DATA YET***
function creatingTableQuery(arr, tbName){

    if(tbName === ""){
        return "Table Name is Empty"
    }
    let tablename = tbName
    let createTable = ""
    let insertInto = []
    
    
    // let tbIdLimit = (arr.length)*1000
    // console.log(tbIdLimit)
    let limit = 255
    let takeKeys = Object.keys(arr[0])     

    let insertionKeys = `tableid BIGINT AUTO_INCREMENT, `
    let keys = ""
    let values = ""

    let takeValues = Object.values(arr[0])

    for(let i = 0; i < takeKeys.length; i++){

        takeKeys[i] = takeKeys[i].replace("Index", "index_id").replace(" ", "_").replace(" ", "_").replace("(", "").replace("(", "")
        .replace(")", "").replace(")", "").replace(".", "").replace(".", "").replace(".", "")

        console.log(takeKeys[i])
    }

    for(i = 0; i < takeKeys.length-1; i++){
        insertionKeys += `${takeKeys[i]} VARCHAR(${limit}), `
    }
    insertionKeys += `${takeKeys[i]} VARCHAR(${limit})`
    createTable = `CREATE TABLE ${tablename}(${insertionKeys}, CONSTRAINT tableid_PK PRIMARY KEY (tableid));`
    

    for(let i=0; i < arr.length; i++){
        keys = ""
        values = ""
        
        takeValues = Object.values(arr[i])
        
        let j
        for(j = 0; j < takeKeys.length-1; j++){
            keys += `${takeKeys[j]}, `
            values += `"${takeValues[j]}", `
        }
        keys += `${takeKeys[j]}`
        values += `"${takeValues[j]}"`
        
        insertInto[i] = `INSERT INTO ${tablename}(${keys}) VALUES(${values}); ` 
 
    }

    console.log(createTable)
    for(let i = 0; i < insertInto.length; i++){
        console.log(insertInto[i])
    }
    instertingDataSQL(createTable, insertInto)

    return "Successfully Created SQLQuery Lines For Creating Table And Insertion"
}


// CSV READS
function csvRead(req, res){
    // let csvfile = req.body.csvfile
    console.log(req.file)
    let csvPath = req.file.path
    
    let actualCsvPath = base_dirname+"/"+csvPath
    let results = []
    console.log(req.file.originalname.replace(".csv", "_t"))

    fs.createReadStream(actualCsvPath)
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", ()=>{
        // console.log(results)
        csvtojson().fromFile(actualCsvPath).then((jsonFile)=>{
            // console.log(jsonFile)
            // let takeKeys = Object.keys(jsonFile[0])
            // for(let i = 0; i < takeKeys.length; i++){
            //     takeKeys[i] = takeKeys[i].replace("Index", "index_id").replace(" ", "_").replace(" ", "_").replace("(", "").replace("(", "").replace(")", "").replace(")", "")
            //     console.log(takeKeys[i])
            // }

            // console.log(takeKeys)

            let uploadContent = JSON.stringify(jsonFile)

            let tbname = req.file.originalname.replace(".csv", "_t").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
                        .replace(" ", "_").replace(" ", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_")

            let msg = creatingTableQuery(jsonFile, tbname)
            console.log(msg)
            res.render("x_adminPages/adminHome.ejs", {message : "File Uploaded", uploadContent})
        })
        // res.render("x_adminPages/adminHome.ejs", {message : "File Uploaded", uploadContent})
    })   
    
    
}



// CREATING DATABASE weatherdb
router.get("/createDB", loginVerify, (req, res)=>{
    // let sql = "CREATE DATABASE weatherdb"
    // db.query(sql, (err, result)=>{
    //     if(err) throw err;
    //     console.log(result)
    //     res.send("Hello Admin, Database has been Created")         
    // })
    res.send("Hello Admin, Database has been Created")
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

