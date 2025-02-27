const express = require("express");
const router = express.Router();
const characterRoutes = require("./characterRoutes");
const houseRoutes = require("./houseRoutes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
  });
});

router.use("/characters", characterRoutes);
router.use("/houses", houseRoutes);

module.exports = router;
