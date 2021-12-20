const express = require("express");
const cartController = require("../Controllers/cartController");

const protect = require("../middleware/protect");

const router = express.Router();
router.use(protect);

router.route("/").get(cartController.getAll).post(cartController.createOne);

router.route("/myCart").get(cartController.myCart, cartController.userCart);

router.route("/userCart").get(cartController.userCart);

router
  .route("/:id")
  .get(cartController.getOne)
  .patch(cartController.update)
  .delete(cartController.delete);
module.exports = router;
