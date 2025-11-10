const Booking = require('../models/Booking');
const twilio = require('twilio');

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createBooking = async (req, res) => {
  const { name, phone, address, serviceType, preferredDateTime, notes } = req.body;

  try {
    const newBooking = new Booking({
      name,
      phone,
      address,
      serviceType,
      preferredDateTime,
      notes,
    });

    const booking = await newBooking.save();
    const phoneLink = `https://wa.me/${phone.replace(/\D/g, '')}`;

    // --- Send WhatsApp Notification to Admin ---
    const messageBody = `
      New Booking Received!
      Name: ${booking.name}
      Phone: ${booking.phone} (click to chat: ${phoneLink})
      Address: ${booking.address}
      Service: ${booking.serviceType}
      Preferred Date & Time: ${new Date(booking.preferredDateTime).toLocaleString()}
      Notes: ${booking.notes || 'N/A'}
    `;

    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER
    });

    console.log('WhatsApp notification sent to admin.');
    // -----------------------------------------

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.uploadPhotos = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const { type } = req.body;
    const files = req.files;

    if (type === 'before') {
      files.forEach((file) => {
        booking.beforePhotos.push(file.path);
      });
    } else {
      files.forEach((file) => {
        booking.afterPhotos.push(file.path);
      });
    }

    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    await booking.remove();
    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};