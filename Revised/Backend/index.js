import express from 'express';
import cors from 'cors';
import mysql from 'mysql'; 

const app = express(); 

app.use(cors()); 
app.use(express.json());


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "friends"
}); 

app.post('/register', (req, res) => {
    const userName = req.body.userName; 
    const password = req.body.password; 
    const confirmPassword = req.body.confirmPassword; 

    connection.query("INSERT INTO users (userName, password) VALUES (?, ?)", [userName, password], 
        (err, result) => {
            if(result){
                res.send(result); 
            } else {
                res.send({message: "Enter Requested Data"})
            }
        }
    )
})

app.post('/login', (req, res) => {
    const userName = req.body.userName; 
    const password = req.body.password; 

    connection.query("SELECT * FROM users WHERE userName = ? AND password = ?", [userName, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err}); 
            } else {
                if(result.length > 0){
                    res.send(result); 
                } else {
                    res.send({message: "Incorrect UserName or Password Entered"}); 
                }
            }
        }
    )
});

app.get("/allcategories", (req, res) => {
    connection.query("SELECT * FROM category", (err, results) => {
      if (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Error fetching categories");
      } else {
        res.json(results);
      }
    });
  });

  app.get("/${categoryId}/:questions", (req, res) => {
    connection.query("SELECT * FROM questions WHERE categoryId=?", (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        res.status(500).send("Error fetching questions");
      } else {
        res.json(results);
      }
    });
  });

app.listen(3001, () => {
    console.log("Backend is running")
})