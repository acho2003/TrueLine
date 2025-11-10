const Service = require('../models/Service');

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
  const { name, description, price } = req.body;
  
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ msg: 'Please upload an image' });
  }

  const imageUrl = req.file.path;

  try {
    const newService = new Service({
      name,
      description,
      price,
      imageUrl,
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res) => {
  const { name, description, price } = req.body;
  let imageUrl = req.body.imageUrl; // Keep existing image if no new one is uploaded

  if (req.file) {
    imageUrl = req.file.path; // Set to new image path if uploaded
  }

  try {
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    service.name = name;
    service.description = description;
    service.price = price;
    service.imageUrl = imageUrl;

    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    // Note: You might want to delete the actual image file from the /uploads folder here as well
    // const fs = require('fs');
    // fs.unlink(service.imageUrl, (err) => {...});

    await service.remove();
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};