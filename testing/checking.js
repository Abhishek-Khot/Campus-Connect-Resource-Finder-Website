app.get("/home/jcer/rooms", (req, res) => {
  let q = "SELECT COUNT(*) FROM jcer";
  connection.query(q, (err, result) => {
    try {
      if (err) throw err;
      console.log(result[0]);
      res.render("checking.ejs", { });
    } catch (err) {
      console.log(err);
      res.send("Some error has been occured in the db");
    }
  });
});
