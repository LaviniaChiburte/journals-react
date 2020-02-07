const express = require("express");
const cors = require("cors");

const models = require("./models");
const journalsRouter = require("./routers/journals-router");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

//daca fac router general pentru journals, cu sub-routes in fisierul journals din folderul routers
// app.use("/journals", journalsRouter);

app.get("/hey", (req, res) => res.send("hello!"));

app.get("/journals", (req, res) => {
  models.Journals.findAll().then(journals => res.json(journals));
});

app.post("/add", (req, res) => {
  console.log(req.body);
  models.Journals.create({
    title: req.body.title,
    createAt: new Date(),
    content: req.body.content
  }).then(journal => res.json(journal));
});

app.get("/journals");
app.get("/journals/:id");
app.post("/journals");
app.delete("/journals/:id");
app.put("/journals/:id");

// app.delete("/", (req, res) => {
//   console.log(req.body);
//   models.Journals.destroy({}).then(journal => res.json(journal));
// });

models.sequelize.sync().then(() =>
  app.listen(port, err => {
    if (err) {
      throw new Error("Something is not working...");
    }

    console.log(`all set on ${port}`);
  })
);