// server/controllers/orderController.js
import Order from '../models/Order.js';
import transporter from '../utils/nodemailer.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, name, email, phone, isUmtStudent, items, subtotal, shipping, tax, total } = req.body;
    console.log(req.body)

    const order = new Order({
      userId: userId || req.user?.id || req.user?._id || null,
      name, email, phone, isUmtStudent, items, subtotal, shipping, tax, total
    });

    const saved = await order.save();

    // Send email to team
    const teamEmail = process.env.TEAM_EMAIL || process.env.EMAIL_USER;
    const itemsHtml = (items || []).map(i => `<li>${i.name} x ${i.quantity} - $${(i.price * i.quantity).toFixed(2)}</li>`).join('');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: teamEmail,
      subject: `New Order #${saved._id} - ${name}`,
      html: `
        <h3>New Order Received</h3>
        <p><strong>Order ID:</strong> ${saved._id}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>UMT Student:</strong> ${isUmtStudent ? 'Yes' : 'No'}</p>
        <h4>Items</h4>
        <ul>${itemsHtml}</ul>
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${shipping.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Mail error', err);
    });

    console.log("Message sent:", info.messageId);

    res.status(201).json({ orderId: saved._id, message: 'Order placed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

