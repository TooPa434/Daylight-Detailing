import express from 'express';
import cors from 'cors';
import { initDatabase, queryDatabase, runDatabase } from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve homepage at root on platforms expecting an explicit / route.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'website.html'));
});

// ===== API ENDPOINTS =====

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, address, service, vehicle, message } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert or get customer
    let customer = await queryDatabase(
      'SELECT id FROM customers WHERE email = ?',
      [email]
    );

    let customerId;
    if (customer.length > 0) {
      customerId = customer[0].id;
    } else {
      const result = await runDatabase(
        'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
        [name, email, phone, address]
      );
      customerId = result.id;
    }

    // Insert contact submission
    await runDatabase(
      'INSERT INTO contact_submissions (customerId, service, vehicle, message) VALUES (?, ?, ?, ?)',
      [customerId, service, vehicle, message]
    );

    res.json({ success: true, message: 'Thanks for your message! We will contact you soon.' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await queryDatabase(
      'SELECT * FROM reviews ORDER BY createdAt DESC'
    );
    res.json(reviews);
  } catch (error) {
    console.error('Reviews error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { userName, email, service, rating, text } = req.body;

    if (!userName || !service || !rating || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    let customer = await queryDatabase(
      'SELECT id FROM customers WHERE email = ?',
      [email]
    );

    let customerId = null;
    if (customer.length > 0) {
      customerId = customer[0].id;
    }

    const result = await runDatabase(
      'INSERT INTO reviews (customerId, userName, service, rating, text) VALUES (?, ?, ?, ?, ?)',
      [customerId, userName, service, rating, text]
    );

    const newReview = {
      id: result.id,
      userName,
      service,
      rating,
      text,
      createdAt: new Date().toISOString()
    };

    res.json(newReview);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create loyalty card
app.post('/api/loyalty-card', async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // Get or create customer
    let customer = await queryDatabase(
      'SELECT id FROM customers WHERE email = ?',
      [email]
    );

    let customerId;
    if (customer.length > 0) {
      customerId = customer[0].id;
    } else {
      const result = await runDatabase(
        'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
        [name, email, phone, address]
      );
      customerId = result.id;
    }

    // Generate unique card number
    const cardNumber = `DD-${Date.now()}-${customerId}`;

    const result = await runDatabase(
      'INSERT INTO loyalty_cards (customerId, cardNumber) VALUES (?, ?)',
      [customerId, cardNumber]
    );

    res.json({
      id: result.id,
      cardNumber,
      stamps: 0,
      message: 'Loyalty card created! Show this to get stamps on each visit.'
    });
  } catch (error) {
    console.error('Loyalty card error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get loyalty card info
app.get('/api/loyalty-card/:cardNumber', async (req, res) => {
  try {
    const card = await queryDatabase(
      'SELECT * FROM loyalty_cards WHERE cardNumber = ?',
      [req.params.cardNumber]
    );

    if (card.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const visits = await queryDatabase(
      'SELECT COUNT(*) as count FROM loyalty_visits WHERE loyaltyCardId = ?',
      [card[0].id]
    );

    res.json({
      ...card[0],
      visits: visits[0].count,
      discount: visits[0].count >= 5 ? '20%' : (visits[0].count >= 3 ? '10%' : 'Next reward at 3 visits')
    });
  } catch (error) {
    console.error('Get loyalty card error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Record visit (stamp)
app.post('/api/loyalty-card/:cardNumber/visit', async (req, res) => {
  try {
    const card = await queryDatabase(
      'SELECT id FROM loyalty_cards WHERE cardNumber = ?',
      [req.params.cardNumber]
    );

    if (card.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await runDatabase(
      'INSERT INTO loyalty_visits (loyaltyCardId) VALUES (?)',
      [card[0].id]
    );

    res.json({ success: true, message: 'Visit recorded! Stamp added to your card.' });
  } catch (error) {
    console.error('Visit error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== SERVER START =====

async function startServer() {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Daylight Detailing Server Running    ║
║         🚗 http://localhost:${PORT}        ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
