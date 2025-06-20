const router = require('express').Router();

const categoryRoute = require("./category.route");
const songRoute = require("./song.route");
const singerRoute = require("./singer.route");
const userRoute = require("./user.route");

router.use(
  "/category", 
  categoryRoute
);

router.use(
  "/song", 
  songRoute
);

router.use(
  "/singer", 
  singerRoute
);

router.use(
  "/user", 
  userRoute
);

module.exports = router;