const express = require("express")
const app = express()
const port = 3000
const mysql = require("mysql")




app.set("view engine", "ejs")

app.use(express.static("public"))
// app.use("/css", express.static(__dirname + "public/css"))
// app.use("/js", express.static(__dirname + "public/js"))
// app.use("/img", express.static(__dirname + "public/img"))


// CREATE CONNECTION MYSQL
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




// BASE HTML PAGES ROUTES
const baseRouter = require("./routes/basePages")
app.use("/", baseRouter)


// ADMIN ROUTES
// const adminRouter = require("./routes/admin")
// app.use("/admin", adminRouter)


// // DATABASE ROUTES
// const databaseRouter = require("./routes/database")
// app.use("/", databaseRouter)





// PORT LISTENING ON
app.listen(port, ()=>{
    console.log("server listening on port "+port)
})