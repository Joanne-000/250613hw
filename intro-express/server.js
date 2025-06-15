const express = require("express");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/greetings/:username", (req, res) => {
  res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

app.get("/roll/:number", (req, res) => {
  if (Number(req.params.number) >= 0) {
    res.send(`<h1>You rolled a ${req.params.number}</h1>`);
  } else {
    res.send(`<h1>You must specify a number.</h1>`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  if (Number(req.params.index) <= collectibles.length) {
    res.send(
      `<h1>So, you want the ${collectibles[req.params.index].name}? For ${
        collectibles[req.params.index].price
      }, it can be yours!</h1>`
    );
  } else {
    res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
  }
});

app.get("/hello", (req, res) => {
  res.send(
    `Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
  );
});

app.get("/shoes", (req, res) => {
  const query = req.query;
  const keys = Object.keys(query);

  if (keys.length > 0) {
    let result = [];
    for (const key of keys) {
      if (result.length === 0) {
        if (key === "min-price") {
          result = shoes.filter((item) => item.price > query[key]);
        }
        if (key === "max-price") {
          result = shoes.filter((item) => item.price < query[key]);
        }
        if (key === "type") {
          result = shoes.filter((item) => item.type === query[key]);
        }
      } else {
        if (key === "min-price") {
          result = result.filter((item) => item.price > query[key]);
        }
        if (key === "max-price") {
          result = result.filter((item) => item.price < query[key]);
        }
        if (key === "type") {
          result = result.filter((item) => item.type === query[key]);
        }
      }
    }
    res.send(`<h1>${JSON.stringify(result)}</h1>`);
  } else {
    res.send(`<h1>${JSON.stringify(shoes)}</h1>`);
  }
});
