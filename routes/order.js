const express = require('express');
const paymentController = require('../Controllers/paymentController');

const protect = require('../middleware/protect');

const router = express.Router();

router.use(protect);

router.route('/').post(paymentController.buyNow);
router.route('/userOrders').get(paymentController.userOrders);
router.route('/cartCheckout').post(paymentController.checkout);
router.route('/downloadFile/:id').get(paymentController.downloadFile);
// router.route("/myCart").get(cartController.myCart, cartController.userCart);
// router.route("/userCart").get(cartController.userCart);

// router
//   .route("/:id")
//   .get(cartController.getOne)
//   .patch(cartController.update)
//   .delete(cartController.delete);
module.exports = router;
