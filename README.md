# Daylight Detailing - Website & Backend

Full-stack website for Daylight Detailing mobile car detailing service.

## Features

- ✓ Responsive website with gallery and service cards
- ✓ Contact form with customer database
- ✓ Customer reviews system
- ✓ Loyalty card program with visit tracking
- ✓ SQLite database for data persistence

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
# Or for auto-restart on changes:
npm run dev
```

The server will run at `http://localhost:3000`

### 3. Database

The SQLite database (`daylight.db`) is automatically created and populated with tables on first run.

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- Submits contact form and stores customer info
- Body: `{ name, email, phone, address, service, vehicle, message }`

### Reviews
- **GET** `/api/reviews` - Fetch all reviews
- **POST** `/api/reviews` - Submit a new review
- Body: `{ userName, email, service, rating, text }`

### Loyalty Cards
- **POST** `/api/loyalty-card` - Create new loyalty card
- **GET** `/api/loyalty-card/:cardNumber` - Get card info
- **POST** `/api/loyalty-card/:cardNumber/visit` - Record visit/stamp

## Deployment

### Option 1: Vercel (Recommended - Free Tier)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New" → "Project"
4. Select your repository
5. Configure:
   - **Build Command:** `npm install` (if needed)
   - **Output Directory:** `.` (current directory)
   - **Environment Variables:** 
     - `NODE_ENV=production`

6. Deploy!

**Note:** Vercel's free tier has limitations for SQLite. Consider using a service like:
- **Turso** (SQLite cloud) - $15/month
- **PlanetScale** (MySQL) - Free tier available
- **MongoDB** - Free tier available

### Option 2: Render (Free - 750 hours/month)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub and select repository
5. Configure:
   - **Name:** daylight-detailing
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Sydney (or closest)

6. Deploy!

### Option 3: Railway (Free $5 credit/month)

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "GitHub Repo"
4. Configure and deploy

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
PORT=3000
NODE_ENV=development
```

For production, set `NODE_ENV=production`

## File Structure

```
webbsite/
├── website.html          # Main website
├── server.js            # Express server
├── database.js          # SQLite setup
├── package.json         # Dependencies
├── daylight.db          # SQLite database (auto-created)
├── .env.example         # Environment template
├── Images/              # Website images
├── LCP.html            # Loyalty card page
└── README.md           # This file
```

## Database Schema

### Customers
- id, name, email, phone, address, createdAt

### Contact Submissions
- id, customerId, service, vehicle, message, submittedAt

### Reviews
- id, customerId, userName, service, rating, text, createdAt

### Loyalty Cards
- id, customerId, cardNumber, stamps, createdAt

### Loyalty Visits
- id, loyaltyCardId, visitDate

## Frontend Integration

The website automatically uses the API when the server is running. Key changes:

1. **Contact Form** → Sends to `/api/contact`
2. **Reviews** → Fetched from `/api/reviews` and `/api/reviews`
3. **Loyalty Card** → Integration ready

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database locked
Delete `daylight.db` and restart server to recreate

### CORS errors
CORS is enabled for all origins in development. Update in `server.js` for production.

## Next Steps

1. **Connect custom domain** to your hosting provider
2. **Add email notifications** for contact submissions
3. **Set up backups** for your database
4. **Monitor** server logs and performance
5. **Collect customer reviews** and update loyalty card data

## Support

For issues or questions, check the configuration files and server logs.

---

**Last Updated:** June 2026
**Version:** 1.0.0
