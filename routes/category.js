const express = require("express");
const categoryController = require("../controllers/categoryController");

const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");
const upload = require("../middleware/imageUpload");

const router = express.Router();
router.use(protect);
router.use(restrictTo(["Admin"]));

router
  .route("/")
  .get(categoryController.getAll)
  .post(upload.single("image"), categoryController.createOne);

router
  .route("/:id")
  .get(categoryController.getOne)
  .patch(upload.single("image"), categoryController.update)
  .delete(categoryController.delete);
module.exports = router;
//This controller is not finished
