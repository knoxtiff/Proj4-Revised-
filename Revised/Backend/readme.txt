mkdir p4backend
cd p4backend
npm init
npm i express
npm i mysql
npm i mysql2
npm i cors
npm i nodemon
create .gitignore to ignore node_modules
modify package.json 
    "type": "module",
   "start": "node index.js"
to start server: 
    "node index.js" 


    
app.get("/allcategories", (req, res) => {
    const sql = "SELECT * FROM categories";

    connection.query(sql, (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });
  
  app.get("/questions/category/${categoryId}", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM questions WHERE `categoryId`= ?";

    connection.query(sql, [id], (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });