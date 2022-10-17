const express = require("express");
const bodyParser = require("body-parser");
// import date function without () from date.js file
const date = require(__dirname + "/date.js");

const app = express();

const items = []; // empty array for list items which is only goes for "/" route
const workItems = []; // empty array for list items on work title

app.set("view engine", "ejs"); //required for ejs. view folder created

app.use(bodyParser.urlencoded({ extended: true })); //required for bodyparser
app.use(express.static("public")); // to get external css files which is inside the public folder we created

app.get("/", function (req, res) {
  let day = date.getDate(); // import the format from date.js file
  res.render("list", { listTitle: day, newListItems: items }); //rendering list.ejs file in order to response and we send values for related keys to catch them in to the ejs file. for ex: we render the title with the day we get from date.getDate(). and inside list.ejs we catch the title in h1
});

app.post("/", function (req, res) {
  let item = req.body.newItem; // took the input which name is newItem, from body and store it inside the item

  if (req.body.list === "Work") {
    // list comes from buttons name and its value changes wheather its work page or "/" page
    workItems.push(item); // if its value is work then we push the item in to the workItems array
    res.redirect("/work"); // redirect the same page
  } else {
    items.push(item); // if its value is not work then we push the item in to the items array
    res.redirect("/"); // redirect the same page
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
  // rendering the list.ejs file on the /work route and collect different key value pairs for another list which is work
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
