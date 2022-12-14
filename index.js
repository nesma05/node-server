const express = require("express");
const bodyParser = require("body-parser");
//const pdf = require("html-pdf");
const cors = require("cors");
const captcha = require("./captcha");

const fs = require("fs");


const pdfTemplate = require("./documents");

const app = express();

global.captcha = "";

const port = process.env.PORT || 5000;

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.use('/fetch-pdf', function(req, res, next){

//   var options = {
//       root: path.join(__dirname)
//   };

//   var fileName = 'result.pdf';
//   res.sendFile(fileName, options, function (err) {
//       if (err) {
//           next(err);
//       } else {
//           console.log('Sent:', fileName);
//           next();
//       }
//   });
// });

app.post("/create-pdf", (req, res) => {
  
  // pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
  //   if (err) {
  //     res.send(Promise.reject());
  //   }

  //   res.send(req.body);
  // });
  res.send(req.body);
});

app.get("/fetch-pdf", (req, res) => {
  fs.createReadStream("result.pdf").pipe(res);
});

// Captcha generation, returns PNG data URL and validation text
app.get("/captcha", (req, res) => {
  const width = 200;
  const height = 100;
  const { image, text } = captcha(width, height);

  global.captcha = text;
  res.send({ image });
});

app.post("/check", (req, res) => {
  console.log("captcha", global.captcha);
  console.log("input", req.body.captcha);
  if (global.captcha === req.body.captcha)
    res.send({ message: "valide captcha" });
  else res.send({ message: "not valide captcha" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
