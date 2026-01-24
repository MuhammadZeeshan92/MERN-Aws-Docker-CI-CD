// server/controllers/orderController.js
import Order from '../models/Order.js';
import transporter from '../utils/nodemailer.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, name, email, phone, isUmtStudent, items, subtotal, shipping, tax, total } = req.body;

    console.log("ORDER BODY:", req.body);

    const sub = Number(subtotal ?? 0);
    const ship = Number(shipping ?? 0);
    const tx = Number(tax ?? 0);
    const tot = Number(total ?? 0);

    const order = new Order({
      userId: userId || req.user?.id || req.user?._id || null,
      name,
      email,
      phone,
      isUmtStudent,
      items,
      subtotal: sub,
      shipping: ship,
      tax: tx,
      total: tot
    });

    const saved = await order.save();

    const teamEmail = process.env.TEAM_EMAIL || process.env.EMAIL_USER;

    if (!teamEmail) {
      console.warn("⚠️ Warning: TEAM_EMAIL and EMAIL_USER not configured");
    }

    const itemsHtml = (items || []).map(i => {
      const price = Number(i.price ?? 0);
      const qty = Number(i.quantity ?? 0);
      return `<li>${i.name} x ${qty} - $${(price * qty).toFixed(2)}</li>`;
    }).join('');

    const mailOptions = {
      from: `"QuickPick Orders" <${process.env.EMAIL_USER}>`,
      to: teamEmail,
      replyTo: email,
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
        <p><strong>Subtotal:</strong> $${sub.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${ship.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${tx.toFixed(2)}</p>
        <p><strong>Total:</strong> $${tot.toFixed(2)}</p>
      `,
    };

    let emailSent = false;
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Message sent:", info.messageId || info.response);
      emailSent = true;
    } catch (e) {
      console.error("❌ Mail error:", {
        message: e.message,
        code: e.code,
        command: e.command,
        response: e.response
      });
    }

    res.status(201).json({ 
      orderId: saved._id, 
      message: "Order placed",
      emailSent: emailSent 
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Server error" });
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

