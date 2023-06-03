var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res, next) {
  // Read the contents of the media folder
  const mediaFolder = path.join(__dirname, "../public", "Images", "media");
  fs.readdir(mediaFolder, (err, files) => {
    if (err) {
      console.error("Error reading media folder:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Pass the list of image filenames to the EJS template
    res.render("home", { images: files });
  });
});

module.exports = router;
