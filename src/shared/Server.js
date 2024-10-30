require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors()); // Add this line before your routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "hotmail", // Or any other email service
  auth: {
    user: "newsmonkey666@outlook.com", // Replace with your email
    pass: "Newsmonkey@123", // Replace with your email password
  },
});

app.post("/send-email", (req, res) => {
  console.log("req\t ", res);
  const email = req.body.email;

  const mailOptions = {
    from: "newsmonkey666@outlook.com", // Replace with your email
    to: email,
    subject: "Welcome to the Newsletter!",
    text: "Thank you for subscribing to our newsletter. Stay tuned for updates!",
  };
  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
