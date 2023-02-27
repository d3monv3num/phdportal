
const express = require("express");
const path = require("path");
const bodyparse = require("body-parser");
const {
  sendRefreshTokenCookie,
  createRefreshToken,
  createAccessToken,
  sendAccessTokenCookie,
} = require("../../utils/jwt");
const getDB = require("../../utils/database").getDB;
const hashfunction = require("../../models/hashfunctionmodel").hashfunction;
const router = express.Router();

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({ extended: true }));

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});
router.get("/index.html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});
router.get("/registration.html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "registration.html"));
});
router.get("/personal_details", (req, res, next) => {
  res.render("personal_details");
});
router.get("/addform", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "addform.html"));
});

// taking details from login and password and using them to find user
router.post("/index.html", (req, res, next) => {
  const db = getDB();
  const userid = req.body.userID;
  const password = hashfunction(req.body.password);
  // searching for the user
  const currstudent = db
    .collection("studentrecord")
    .find({ id: userid, loginpassword: password })
    .next()
    .then((studentrecord) => {
      console.log(studentrecord);
      if (studentrecord == null) {
        // user not found
        res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
      } else {
        const accessToken = createAccessToken(userid);
        const refresToken = createRefreshToken(userid);

        sendRefreshTokenCookie(res, refresToken);
        sendAccessTokenCookie(res, accessToken);

        res.render("dashboard"); //user found
      }

      return { studentrecord, accessToken, refresToken };
    })
    .catch((err) => {
      console.log(err);
      res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
    });
  console.log(`userid:${userid} and passkey ${password}`);
});


// taking details from registration and redirecting to fill details
router.post("/registration.html", (req, res, next) => {
  const enrollmentno = req.body.enrollment_no;
  const mailid = req.body.emailid;
  console.log(`enrollmentnumber: ${enrollmentno}`);

  res.sendFile(path.join(__dirname, "..", "..", "views", "addform.html"));
});

module.exports = router;
