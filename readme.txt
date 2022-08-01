WEATHER DATABASE: 

GET Started with:
1. Install Nodejs from online

2. **Install XAMPP this package will install mysql. Then open mysql and create a Database manually naming it "weatherdb". Run the following codes below on mysql:
    - CREATE DATABASE weatherdb
    - CREATE TABLE User_t(id int AUTO_INCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), contact_number VARCHAR(50), gender CHAR(10), date_Of_Birth DATE, address TEXT(255), city VARCHAR(30), zip int, password VARCHAR(100), PRIMARY KEY (id));

3. Download or pull this folder CSE303L_WEATHER_PROJECT_2022 from github repository.

4. Open a new terminal on VSCode and run these commands: 
    i) npm install 
    (this will install a node_modules folder to this existing project folder)

    ii) npm run myserver or Nodemon server.js 
    (this will run the existing project and livestream host)

    iii) go to your browser and paste this on url link "localhost:3000" 

You're good to view things properly so far I guess.







MYSQL QUERIES TO BE PERFORMED (COPY AND PASTE THEM FROM BELOW)
    DATABASE Name (**Perform only once!):
    - CREATE DATABASE weatherdb

    User Table:
    - CREATE TABLE User_t(id int AUTO_INCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), contact_number VARCHAR(50), gender CHAR(10), date_Of_Birth DATE, address TEXT(255), city VARCHAR(30), zip int, password VARCHAR(100), PRIMARY KEY (id));