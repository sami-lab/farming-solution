const express = require("express");
const administrationController = require("../controllers/administratorController");
const productController = require("../controllers/productController");

//const upload = require('../middleware/imageUpload');
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");

const router = express.Router();
router.use(protect);
router.get(
  "/getShopDashboardData",
  restrictTo(["Manager"]),
  administrationController.getShopDashboardData
);
router.get(
  "/shopProducts/",
  restrictTo(["Manager"]),
  productController.getAllProductofShopManager,
  productController.getAllProductofShop
);
router.use(restrictTo(["Admin"]));

router.get("/pendingShops", administrationController.pendingShop);
router.post("/approveShop/:id", administrationController.approveShop);

router
  .route("/Products/:managerId")
  .get(productController.getAllProductofShopManager);

module.exports = router;
