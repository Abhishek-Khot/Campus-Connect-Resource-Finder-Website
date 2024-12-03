const mysql = require("mysql2");
const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(path.join(__dirname, 'storage')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'storage'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "rooms",
  password: "forgot 123",
});

app.get("/", (req, res) => {
  res.render("animation.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.get("/home/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "contact.html"));
});
app.get("/home/fiq", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "fiq.html"));
});
app.get("/home/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "about", "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend2", "index.html"));
});
app.get("/signup/error", (req, res) => {
  res.render("errorOfLogin.ejs");
});
app.get("/res", (req, res) => {
  res.render("res.ejs");
});


//today (22/11) jcer page 
app.get("/home/jcer",(req,res)=>{
    res.render("jcer-home.ejs");
});

app.get("/home/jcer/rooms", (req, res) => {
  let q = "SELECT * FROM jcer";
  connection.query(q, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      res.render("jcer-pg.ejs", {pgList:result});
    } catch (err) {
      console.log(err);
      res.send("Some error has been occured in the db");
    }
  });
});

// /⁡⁣⁣23/11 jcer page
app.get("/home/jcer/rooms/add",(req,res)=>{
  res.render("add-jcer-pg.ejs");
});

app.post("/home/jcer/rooms", upload.single("image"), (req, res) => {
  const { name, address, cost, facilities, dist, password, availrooms } = req.body;

  const secretKey = "12345";
  if (password !== secretKey) {
    return res.status(400).send("Invalid secret key");
  }

  // Construct the image path
  const imagePath = "/storage/" + req.file.filename;

  // Updated SQL query to include the 'availrooms' field
  const query = "INSERT INTO jcer (name, address, cost, facilities, dist, image, rating, availrooms) VALUES (?, ?, ?, ?, ?, ?, 0, ?)";
  const values = [name, address, cost, facilities, dist, imagePath, availrooms]; // Add 'availrooms' to values

  // Execute the query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting PG:", err);
      res.status(500).send("Error inserting PG into the database");
    } else {
      console.log("PG added successfully");
      res.redirect("http://localhost:8080/home/jcer/rooms");
    }
  });
});
//26/11
app.get("/home/jcer/mess", async (req, res) => {
  console.log(res);
  try {
    // Query to fetch all mess data from the jcermess table
    connection.query('SELECT * FROM jcermess', (err, results) => {
      if (err) {
        console.error('Error fetching mess data:', err);
        return res.status(500).send("Error retrieving mess data.");
      }
      // console.log('Fetched results:', results); // Check the data
      res.render("jcer-mess.ejs", { messData: results });
    });
    
  } catch (err) {
    console.error('Error in database operation:', err);
    res.status(500).send("Error processing the request.");
  }
});
app.get("/home/jcer/mess/add",(req,res)=>{
  res.render("add-jcer-mess.ejs")
})
//27/11
app.post("/home/jcer/mess/add", upload.single("messImage"), (req, res) => {
  const { messName, timings, dailySpecial } = req.body;
  // const messImage = req.file ? req.file.path : ""; // Handle image upload
  const messImage = req.file ? `/storage/${req.file.filename}` : "";
  // Initialize menu items with defaults
  const menu1 = req.body.menu1 || "";
  const menu2 = req.body.menu2 || "";
  const menu3 = req.body.menu3 || "";
  const menu4 = req.body.menu4 || "";
  const menu5 = req.body.menu5 || "";
  const menu6 = req.body.menu6 || "";
  const menu7 = req.body.menu7 || "";
  const menu8 = req.body.menu8 || "";

  // SQL query for insertion (auto-increment MessID)
  const sql = `
    INSERT INTO jcermess (MessName, MessImage, Timings, DailySpecial, Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7, Menu8)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    messName,
    messImage,
    timings,
    dailySpecial,
    menu1,
    menu2,
    menu3,
    menu4,
    menu5,
    menu6,
    menu7,
    menu8,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error saving mess data.");
    }
    res.redirect("/home/jcer/mess"); // Redirect after success
  });
});

// Assuming you already have the necessary imports and a connection to the database
app.get("/home/jcer/mess/see-more/:messID", (req, res) => {
  const messID = req.params.messID; // Get the MessID from the URL parameter

  // SQL query to get the details of the mess
  const sql = `SELECT * FROM jcermess WHERE MessID = ?`;

  connection.query(sql, [messID], (err, result) => {
    if (err) {
      console.error('Error fetching mess details:', err);
      return res.status(500).send("Error fetching mess details.");
    }

    if (result.length > 0) {
      // Render the page with the mess details passed as context
      res.render('see-more', { messDetails: result[0] });
    } else {
      res.status(404).send("Mess not found.");
    }
  });
});

// Route to show the Edit Menu page
app.get("/home/jcer/mess/edit-menu/:messID", (req, res) => {
  const messID = req.params.messID;

  const sql = `SELECT * FROM jcermess WHERE MessID = ?`;

  connection.query(sql, [messID], (err, result) => {
    if (err) {
      console.error("Error fetching mess details:", err);
      return res.status(500).send("Error fetching mess details.");
    }

    if (result.length > 0) {
      // Render the edit page with the mess details
      res.render('edit-menu', { messDetails: result[0] });
    } else {
      res.status(404).send("Mess not found.");
    }
  });
});
// Route to save the updated menu
app.post("/home/jcer/mess/save-menu/:messID", (req, res) => {
  const messID = req.params.messID;
  const { Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7, Menu8 } = req.body;

  const sql = `
    UPDATE jcermess
    SET Menu1 = ?, Menu2 = ?, Menu3 = ?, Menu4 = ?, Menu5 = ?, Menu6 = ?, Menu7 = ?, Menu8 = ?, lastUpdated = NOW()
    WHERE MessID = ?`;

  connection.query(sql, [Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7, Menu8, messID], (err, result) => {
    if (err) {
      console.log(err);
      console.error("Error saving menu:", err);
      return res.status(500).send("Error saving menu.");
    }

    // Redirect to the page where the menu can be viewed
    res.redirect(`/home/jcer/mess/see-more/${messID}`);
  });
});


//stationary
app.get("/home/jcer/station", (req, res) => {
  const query = "SELECT * FROM StationeryStores"; // Fetch all store data

  connection.query(query, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error fetching store data');
          return;
      }
      // Render the page and pass the result (store data) to EJS
      res.render("jcer-station", { stores: result });
  });
});

app.get("/home/jcer/station/add",(req,res)=>{
  res.render("add-jcer-station.ejs");
});


app.post('/home/jcer/station/add', upload.single('image'), (req, res) => {
  const { name, address, contact_number, email, hours_of_operation, rating, product_name, special_key } = req.body;
  const image = req.file ? `/storage/${req.file.filename}` : null;
  const specialKey = "12345";  // Define your special key for validation

  // Check if special key matches
  if (special_key !== specialKey) {
      return res.status(400).send('Invalid special key');
  }

  // SQL query to insert the data into the StationeryStores table
  const query = `
      INSERT INTO StationeryStores (name, address, contact_number, email, hours_of_operation, rating, product_name, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  connection.query(query, [name, address, contact_number, email, hours_of_operation, rating, product_name, image], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error saving store information');
      }

      res.redirect('http://localhost:8080/home/jcer/station');
  });
});
//hospital route is not created
app.get("/home/jcer/hospital",(req,res)=>{
  res.render("jcer-hospital.ejs");
})
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend2")));

app.listen(port, (res, req) => {
  console.log(`Listening to the port ${port}`);
});
