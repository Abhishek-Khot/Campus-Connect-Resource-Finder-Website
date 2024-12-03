INSERT into predefined_jcer(name, address, cost, facilities, dist, rating, id, image)
VALUES 
('LILA NIVAS Boys PG', 'kalameshwar Housing Colony, Udyambag, Belagavi, Karnataka 590006', 2500.00, 'Beds, Bed sheets,Wardrobes,Fan,Free Wi-Fi', 1.4, 1, 1, 'https://lh5.googleusercontent.com/p/AF1QipNlQQClaR8Jqija2N36aNk7uQClsrNhlxxBg1L9=w533-h240-k-no');



CREATE TABLE predefined_jcer (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    address VARCHAR(200),
    cost INT,
    facilities VARCHAR(200),
    dist INT,
    rating INT DEFAULT 0,
    image VARCHAR(2000)
);


// // app.post("/home/jcer/rooms", (req, res) => {
// //   const { pgName } = req.body;

// //   // Validate the input
// //   if (!pgName) {
// //     res.status(400).send("PG name is required.");
// //     return;
// //   }

// //   // Query to fetch the PG details from the predefined_jcer table
// //   const fetchQuery = "SELECT * FROM predefined_jcer WHERE name = ?";
// //   connection.query(fetchQuery, [pgName], (err, result) => {
// //     if (err) {
// //       console.log(err);
// //       res.status(500).send("Error occurred while fetching PG details.");
// //       return;
// //     }

// //     if (result.length === 0) {
// //       res.status(404).send("PG not found in predefined options.");
// //       return;
// //     }

// //     // PG details fetched from predefined_jcer
// //     const pgDetails = result[0];

// //     // Query to insert the PG details into the jcer table
// //     const insertQuery = `
// //       INSERT INTO jcer (name, address, cost, facilities, dist, rating, image)
// //       VALUES (?, ?, ?, ?, ?, ?, ?)
// //     `;
// //     connection.query(
// //       insertQuery,
// //       [
// //         pgDetails.name,
// //         pgDetails.address,
// //         pgDetails.cost,
// //         pgDetails.facilities,
// //         pgDetails.dist,
// //         pgDetails.rating,
// //         pgDetails.image,
// //       ],
// //       (err) => {
// //         if (err) {
// //           console.log(err);
// //           res.status(500).send("Error occurred while adding PG to the main table.");
// //           return;
// //         }

// //         // Redirect or send success response
// //         res.redirect("/home/jcer/rooms");
// //       }
// //     );
// //   });
// // });
// app.post("/home/jcer/rooms", (req, res) => {
//   const pgName = req.body.pgName.trim(); // Ensure no leading/trailing spaces
//   const password = req.body.password; // You can decide whether or not to use this

//   // Step 1: Check if the PG already exists in jcer table
//   let checkPGQuery = "SELECT * FROM jcer WHERE name = ?";
//   connection.query(checkPGQuery, [pgName], (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.send("Error accessing the database.");
//     }

//     // Step 2: If PG exists in jcer, send a message
//     if (result.length > 0) {
//       return res.send("PG already exists in the system.");
//     }

//     // Step 3: If PG doesn't exist, get it from predefined_jcer
//     let fetchPGQuery = "SELECT * FROM predefined_jcer WHERE name = ?";
//     connection.query(fetchPGQuery, [pgName], (err, predefinedPG) => {
//       if (err) {
//         console.log(err);
//         return res.send("Error fetching PG details.");
//       }

//       if (predefinedPG.length === 0) {
//         // If PG name doesn't exist in predefined_jcer
//         return res.send("PG not found in predefined options.");
//       }

//       // Step 4: Insert the PG into jcer table
//       let pgData = predefinedPG[0];
//       let insertQuery = "INSERT INTO jcer (name, address, cost, facilities, dist, rating, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
      
//       connection.query(insertQuery, [pgData.name, pgData.address, pgData.cost, pgData.facilities, pgData.dist, pgData.rating, pgData.image], (err, insertResult) => {
//         if (err) {
//           console.log(err);
//           return res.send("Error inserting PG into the jcer table.");
//         }

//         // Step 5: Redirect to the rooms page after successfully adding the PG
//         res.redirect("/home/jcer/rooms");
//       });
//     });
//   });
// });

CREATE TABLE  kle(
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    facilities TEXT NOT NULL,
    dist DECIMAL(10, 2) NOT NULL,
    rating INT DEFAULT 0,
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL
);
INSERT INTO kle(name, address, cost, facilities, dist, image)
VALUES 
('Greenview PG', '123 Elm Street, City Center', 4500.00, 'Wi-Fi, 24/7 Water, Laundry', 1.5, 'greenview.jpg'),
('Sunshine Stay', '456 Oak Avenue, Near Market', 5200.00, 'AC, Wi-Fi, Gym, Meals Included', 2.0, 'sunshine.jpg');
