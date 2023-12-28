const jwt = require("jsonwebtoken"); // importing  jwt
const bcrypt = require("bcrypt"); // bcrypt for encription

const express = require("express"); // express importing
const app = express(); // storing express function as app
app.use(express.json());

const cookieParser = require("cookie-parser"); // for parsing the cookie
app.use(cookieParser()); //using cookie parser

const cors = require("cors"); // importing cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
); // using cors for sharing data between different ports

const bodyParser = require("body-parser"); // imorting bodyparser
app.use(bodyParser.json()); // using bodyParser

const mysql = require("mysql"); // importing mysql
const port = 5000; // defining port 5000

const salt = 7;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "real_foodies",
}); // mysql connection as a variable

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
}); // connecting to database

// login api authentication
app.post("/login", (req, res) => {
  const { email } = req.body;
  con.query(`SELECT * FROM customers WHERE email = '${email}'`, (err, data) => {
    if (err) return res.json("Login Failed");
    if (data.length > 0) {
      const email = data[0].email;
      const token = jwt.sign({ email }, "real-foodies-need-some-workout", {
        expiresIn: "1d",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send(data[0]);
    } else {
      res.send({ data: null });
    }
  });
});

// verify user function to verify the token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "NotFound" });
  } else {
    jwt.verify(token, "real-foodies-need-some-workout", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Error In Decoding" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

// home page authentication
app.get("/", verifyUser, (req, res) => {
  return res.json({ status: "Success", email: req.email });
});

app.post("/", (req, res) => {
  const { email } = req.body;
  let qr = `SELECT * FROM customers WHERE email = '${email}'`;
  con.query(qr, (err, data) => {
    if (err) return res.json("failed to fetch");
    if (data.length > 0) {
      res.send(data[0].name);
    } else {
      return res.json("error");
    }
  });
});

// contact page authentication
app.get("/contact", verifyUser, (req, res) => {
  return res.json({ status: "Success" });
});

// about page authentication
app.get("/about", verifyUser, (req, res) => {
  return res.json({ status: "Success" });
});

// orders page authentication
app.get("/orders", verifyUser, (req, res) => {
  return res.json({ status: "Success" });
});

// cart page authentication
app.get("/cart", verifyUser, (req, res) => {
  return res.json({ status: "Success" });
});

// profile page authentication
app.get("/profile", verifyUser, (req, res) => {
  return res.json({ status: "Success", email: req.email });
});

// profile page personal details req
app.post("/profile", (req, res) => {
  const { email } = req.body;
  qr = `SELECT * FROM customers WHERE email = '${email}'`;
  con.query(qr, (err, data) => {
    if (err) return res.json("Failed");
    if (data.length > 0) {
      res.send(data[0]);
    } else {
      return res.json("error");
    }
  });
});
// profile page user address req
app.post("/profile/address", (req, res) => {
  const { email } = req.body;
  qr = `SELECT * FROM useraddress WHERE email = '${email}'`;
  con.query(qr, (err, data) => {
    if (err) return res.json("Failed");
    if (data.length > 0) {
      res.send(data[0]);
    } else {
      return res.json("error");
    }
  });
});

app.post("/profile/edit/personal", (req, res) => {
  const { name, email, phone, prevEmail } = req.body;
  qr = `UPDATE customers SET email = ?, phone = ?, name = ? WHERE email = ?`;
  con.query(qr, [email, phone, name, prevEmail], (err, data) => {
    if (err) return res.json("Failed TO Update");
    console.log(data)
    // if (data && data.affectedRows > 0) {
    //   res.json({status: "success"});
    // } else {
    //   res.sendStatus(204);
    // }
  })
});

// logout api authentication
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Message: "Success" });
});

// signup api authentication
app.post("/signup", (req, res) => {
  const { name, email, phone, password } = req.body;
  con.query(
    `INSERT INTO customers (email, phone, name, passwd) VALUES (?, ?, ?, ?)`,
    [email, phone, name, password],
    (error, results, fields) => {
      if (error) throw error;
      res.json({ id: results.insertId, message: "Signup successful" });
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.warn(err);
  }
  console.log(`Server listening on port ${port}`);
});
