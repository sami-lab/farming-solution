const express = require("express");
const shopController = require("../controllers/shopController");

const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");
const upload = require("../middleware/imageUpload");

const router = express.Router();

router.route("/myshop").get(protect, shopController.myshops);
router.route("/:id").get(shopController.getOne);
router.use(protect);

router.route("/").post(shopController.createOne);
//Route for Shop Manager to get his shops

router
  .route("/updateShop")
  .patch(restrictTo(["Manager"]), shopController.update);
router
  .route("/updateProfile")
  .patch(
    restrictTo(["Manager"]),
    upload.single("shopProfile"),
    shopController.updateProfile
  );
router
  .route("/updateCover")
  .patch(
    restrictTo(["Manager"]),
    upload.single("shopCover"),
    shopController.updateCover
  );

router.use(restrictTo(["Admin"]));
router.route("/:id").delete(shopController.delete);

router.route("/").get(shopController.getAll);
//To Search for Manager shops with Manager Id
router.route("/managerShops/:managerId").get(shopController.managerShops);

module.exports = router;
