const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getServices) // Public route
  .post(protect, upload.single('image'), createService); // Admin route, handles single file upload

router.route('/:id')
  .put(protect, upload.single('image'), updateService) // Admin route
  .delete(protect, deleteService); // Admin route

module.exports = router;