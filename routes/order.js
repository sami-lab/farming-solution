const express = require("express");
const paymentController = require("../controllers/paymentController");

const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");

const router = express.Router();

router.use(protect);

router.route("/").post(paymentController.buyNow);
router.route("/userOrders").get(paymentController.userOrders);
router.route("/cartCheckout").post(paymentController.checkout);
router.route("/downloadFile/:id").get(paymentController.downloadFile);
// router.route("/myCart").get(cartController.myCart, cartController.userCart);
// router.route("/userCart").get(cartController.userCart);
router
  .route("/shopOrders")
  .get(
    restrictTo(["Manager"]),
    paymentController.getAllOrderofShopManager,
    paymentController.getAllOrderofShop
  );

// router
//   .route("/:id")
//   .get(cartController.getOne)
//   .patch(cartController.update)
//   .delete(cartController.delete);
module.exports = router;
