const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'HIDDEN'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
];
};


// let q = "INSERT INTO user (id , username , email , password) VALUES ?";

// let data = [];
// for(let i = 1; i<=100; i++){
//   data.push(getRandomUser());
// }



// connection.end();

// console.log(getRandomUser());

app.listen("8080" , () =>{ 
  console.log("server is listing to port no 8080");
});

//---------HOME ROUTE-----------//
app.get("/" , (req , res) => {
  let q = `SELECT count(*) FROM user`;

  try{
    connection.query(q , (err , result) => {
    if(err) throw err;
    let count = (result[0]["count(*)"]);
    res.render("home.ejs" , {count});
});
}catch (err){
    console.log(err);
    res.send("some error in database");
}
});

//-----------SHOW USERS------------//

app.get("/user" , (req , res) => {
  let q = `SELECT * FROM user`;
  try{
    connection.query(q , (err , users) => {
    if(err) throw err;
    res.render("show.ejs" , {users});
});
}catch (err){ 
    console.log(err);
    res.send("some error in database");
}

});


//------------Edit Route------------//

app.get("/user/:id/edit" , (req , res) =>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`
  try{
    connection.query(q , (err , result) => {
    if(err) throw err;
    let user = result[0];
    res.render("edit.ejs" , {user});
});
}catch (err){ 
    console.log(err);
    res.send("some error in database");
}
});

//-------------UPDATE ROUTE(DB)-------------//
app.patch("/user/:id" , (req , res)=>{
  let {id} = req.params;
  let{password: formPass , username:newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`
  try{
    connection.query(q , (err , result) => {
    if(err) throw err;
    let user = result[0];
    if(formPass !== user.password) {
      res.send("Wrong Password");
    } else {
      let q2 = `UPDATE user SET username ='${newUsername}' WHERE id='${id}'`;
      connection.query(q2 , (err , result) => {
        if(err) throw err;
        res.redirect("/user");
      });
    }
});
}catch (err){ 
    console.log(err);
    res.send("some error in database");
}
});


//---------------ADD NEW USER Route--------------//

app.get("/user/new" , (req , res) =>{
  res.render("new.ejs");
});

// ADD USER TO DATABASE

app.post("/user", (req, res) => {

    let { username, email, password } = req.body;
    let id = uuidv4();

    let q = `INSERT INTO user (id,username, email, password)
             VALUES (?, ?, ?, ?)`;

    connection.query(q, [id, username, email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Error adding user");
        }

        res.redirect("/user");

    });

});

//---------------DELETE ROUTE--------------------//
// DELETE USER FORM

app.get("/user/:id/delete", (req, res) => {

    let { id } = req.params;

    res.render("delete.ejs", { id });

});

// DELETE USER

app.delete("/user/:id", (req, res) => {

    let { id } = req.params;
    let { email, password } = req.body;

    let q = `SELECT * FROM user WHERE id = ?`;

    connection.query(q, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        if (result.length === 0) {
            return res.send("User not found");
        }

        let user = result[0];

        if (email !== user.email || password !== user.password) {
            return res.send("Incorrect email or password");
        }

        let deleteQuery = `DELETE FROM user WHERE id = ?`;

        connection.query(deleteQuery, [id], (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Error deleting user");
            }

            res.redirect("/user");

        });

    });

});