const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middleware/imageUpload");
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");

const router = express.Router();

router.route("/").get(productController.getAll);
router.route("/recentproducts").get(productController.recentproducts);

router
  .route("/category/:category")
  .get(productController.getAllProductsCategories);

router.route("/:id").get(productController.getOne);

router.route("/shop/:shopId").get(productController.getAllProductofShop);

router
  .route("/getProductByName/:productName")
  .get(productController.getProductByName);

router.use(protect);
router.use(restrictTo(["Manager"]));

router.route("/").post(
  //productController.decode
  upload.fields([{ name: "images", maxCount: 8 }]),
  //upload.array('images', 8),
  productController.createOne
);

router
  .route("/:id")
  .post(
    upload.fields([{ name: "newImages", maxCount: 8 }]),
    productController.update
  )
  .delete(productController.delete);

router.route("/myProducts").get(productController.getMyProducts);

module.exports = router;
