const express = require('express');
const administrationController = require('../Controllers/administratorController');
const productController = require('../Controllers/productController');

//const upload = require('../middleware/imageUpload');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictedTo');

const router = express.Router();
router.use(protect);
router.get(
  '/getShopDashboardData',
  restrictTo(['Manager']),
  administrationController.getShopDashboardData
);
router.use(restrictTo(['Admin']));

router.get('/pendingShops', administrationController.pendingShop);
router.post('/approveShop/:id', administrationController.approveShop);

router
  .route('/Products/:managerId')
  .get(productController.getAllProductofShopManager);

module.exports = router;