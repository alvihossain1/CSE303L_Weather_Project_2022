const express = require("express")
const router = express()
const mysql = require("mysql")
const path  = require("path")

// BODY PARSER -- CHECKS
const bodyParser = require("body-parser")
const {check, validationResult} = require("express-validator")
const { json } = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({exteded: false})


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "weatherdb"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Database is Connected!");
});





// SEARCH PAGE
router.get("/search", (req, res)=>{ 
    console.log(req.query.searchtable)
    let tbname = req.query.searchtable
    
    if(tbname == ""){
        res.render("baseHTMLpages/index.ejs")
        return
    } 

    let sql = `SELECT * FROM ${tbname}`
    
    db.query(sql, (err, result)=>{
        try{
            if(err) throw err;
            console.log(result)
            let uploadContent = result
            res.render("x_adminPages/tableView.ejs", {message : "Upload a CSV File", uploadContent, tbname})
        }
        catch(err){
            res.send(err.sqlMessage)
        }
    }) 
})


// SIGN UP ROUTE
router.post("/signup", urlencodedParser, [
    check("fname", "Please Enter First Name").exists().isLength({min: 2}),
    check("lname", "Please Enter Last Name").exists().isLength({min: 2}),
    check("email", "this email must be an email!").exists().isEmail().normalizeEmail(),
    check("contactNo", "Please Enter Contact No").exists().isLength({min: 11}),
    check("dob", "Please Enter Date-Of-Birth").exists().isLength({min: 3}),
    check("gender", "Please select gender").exists().isLength({min: 1}),
    check("address", "Please provide address").exists().isLength({min: 1}),
    check("city", "Please provide the City name").exists().isLength({min: 1}),
    check("zip", "Please enter the zip code").exists().isLength({min: 1}),
    check("password", "Please enter password, must be 5 letters minimum").exists().isLength({min: 5}),
    
], (req, res)=>{
    let cities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Mymensingh", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
    const errors = validationResult(req)

    
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render("baseHTMLpages/signup", {alert, cities})
    }
    else{        
        let user = {first_name: req.body.fname, 
            last_name: req.body.lname, 
            email: req.body.email, 
            contact_number: req.body.contactNo,
            date_Of_Birth: req.body.dob,
            gender: req.body.gender,
            address: req.body.address, 
            city: req.body.city,
            zip: req.body.zip,
            password: req.body.password
            }
        
       

        let = sql = "INSERT INTO User_t SET ?"
        db.query(sql, user, (err, result)=>{
            try{
                if(err) throw err;
                console.log(result)
            }
            catch(err){
                res.send(err)
            }
        })

        let cities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Mymensingh", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
        const reg = {            
            status: true,
            heading: "Registration Done Successfully!",
            text: "Thank You " + req.body.fname+" "+req.body.lname+" for being with us."            
        }

        res.render("baseHTMLpages/signup", {reg, cities})

    }
   
})




module.exports = router