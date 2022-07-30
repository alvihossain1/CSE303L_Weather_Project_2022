const express = require("express")
const app = express()
const port = 3000
const mysql = require("mysql")
const multer = require("multer")


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use("/admin", express.static(__dirname + "/public"))


// DATABASE CONNECTION
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "WeatherDB"
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Database is Connected!");
// });


// const bodyParser = require("body-parser")
// const {check, validationResult} = require("express-validator")
// const urlencodedParser = bodyParser.urlencoded({exteded: false})

// EXPORTS
// module.exports = db


// MULTER START
newDate = new Date()
let currentDate = newDate.getDate()+"-"+newDate.getMonth()+"-"+newDate.getFullYear().toString()
currentDate = currentDate.toString()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === "text/csv"){
            cb(null, "./All_Uploads/csv")
        }
        else if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            cb(null, "./All_Uploads/images")
        }
        else{
            cb(null, "./All_Uploads/others")
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
        .replace(" ", "_").replace(" ", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_"))
    }, 
})

const multerUpload = multer({storage: fileStorageEngine})

module.exports = multerUpload
// MULTER END



// ---------------------------------------------------------------------------------------------------------------------- //

// BASE HTML PAGES ROUTES
const baseRouter = require("./routes/basePages")
app.use("/", baseRouter)


// ADMIN ROUTES
const adminRouter = require("./routes/admin")
app.use("/admin", adminRouter)


// // DATABASE ROUTES
const databaseRouter = require("./routes/database")
app.use("/", databaseRouter)


// PORT LISTENING ON
app.listen(port, ()=>{
    console.log("server listening on port "+port)
})