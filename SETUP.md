# Getting Started - Backend Setup

Your Daylight Detailing website is now ready to go online! Here's what you need to do:

## What's New

✅ **Backend Server** - Node.js + Express  
✅ **Database** - SQLite with customer data, reviews, contact forms, loyalty cards  
✅ **API Endpoints** - Contact form, reviews, loyalty card management  
✅ **Ready for Deployment** - Works with Render, Railway, Vercel  

## Files Added

```
webbsite/
├── server.js                 ← Main backend server
├── database.js              ← Database setup & queries
├── package.json             ← Dependencies list
├── .env.example             ← Configuration template
├── .gitignore               ← Git ignore list
├── vercel.json              ← Vercel config
├── README.md                ← Technical documentation
├── DEPLOYMENT.md            ← Deployment instructions
└── website.html             ← Updated to use APIs
```

## Quick Start - Option A: Deploy Immediately (EASIEST)

### 1. **Install Node.js** (if you haven't already)
   - Download from https://nodejs.org (LTS version)
   - Install and restart your computer

### 2. **Push to GitHub**
   ```bash
   cd c:\Users\davey\OneDrive\Documents\webbsite
   git init
   git add .
   git commit -m "Initial commit with backend"
   git remote add origin https://github.com/YOUR_USERNAME/daylight-detailing.git
   git push -u origin main
   ```
   *(If you don't have Git installed, download from https://git-scm.com)*

### 3. **Deploy to Render** (FREE!)
   - Go to https://render.com
   - Sign up with GitHub
   - Create New → Web Service
   - Connect your repository
   - Set:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Click Deploy!
   - Your site goes live in 2-3 minutes ✨

See [DEPLOYMENT.md](DEPLOYMENT.md) for full step-by-step guide for all platforms.

---

## Quick Start - Option B: Test Locally First

### 1. **Install Node.js**
   - Download: https://nodejs.org (LTS version)
   - Install and restart

### 2. **Open Terminal in Website Folder**
   ```bash
   cd c:\Users\davey\OneDrive\Documents\webbsite
   ```

### 3. **Install Dependencies**
   ```bash
   npm install
   ```

### 4. **Start the Server**
   ```bash
   npm start
   ```

### 5. **Open in Browser**
   - Go to: http://localhost:3000
   - Test contact form
   - Test reviews
   - Everything should work!

### 6. **Stop Server**
   - Press `Ctrl + C` in terminal

---

## How It Works Now

### Contact Form
- Fills out form → Sent to `/api/contact` → Stored in database
- Customer info saved for future reference

### Reviews
- Reviews loaded from database instead of local storage
- New reviews can be added via API

### Loyalty Cards
- Can create loyalty cards for customers
- Track visits and stamps
- Calculate discounts automatically

---

## Database Structure

The SQLite database (`daylight.db`) automatically stores:

1. **Customers**
   - Name, email, phone, address

2. **Contact Submissions**
   - All contact form data
   - Which customer submitted it
   - Date/time

3. **Reviews**
   - Rating, text, customer info
   - Displayed on website

4. **Loyalty Cards**
   - Card number
   - Associated customer
   - Visit tracking

---

## Deployment Platforms (FREE Options)

### Render ⭐ (RECOMMENDED)
- Free tier includes database persistence
- Easy GitHub integration
- Automatic redeploys on push
- Best for this project
- **Go to:** https://render.com

### Railway
- $5 free credit/month
- Simple deployment
- Good performance
- **Go to:** https://railway.app

### Vercel
- Super fast but SQLite doesn't persist
- Good for frontend only
- Would need separate database
- **Go to:** https://vercel.com

---

## Custom Domain

After deployment, connect your domain:

1. Purchase domain (GoDaddy, NameCheap, etc.)
2. Point DNS to your hosting provider
3. Add custom domain in hosting dashboard
4. Takes 24-48 hours to propagate

**Example:** daylight-detailing.com.au → your Render URL

---

## Support Files

- **README.md** - Technical documentation
- **DEPLOYMENT.md** - Detailed deployment guide for each platform
- **.env.example** - Configuration template
- **.gitignore** - What not to commit to GitHub

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Test locally (`npm install && npm start`)
3. ✅ Push to GitHub
4. ✅ Deploy to Render/Railway
5. ✅ Set up custom domain
6. ✅ Monitor your site

---

## Troubleshooting

### npm command not found
- Restart your computer after installing Node.js
- Or open a new terminal

### Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Try different port: `PORT=3001 npm start`

### Can't connect to database
- Make sure you're in the website folder
- Check that `daylight.db` is created in root folder

### CORS errors
- Check API_BASE in website.html
- Should be `/api` for local, `https://yoursite.com/api` for production

---

## Questions?

1. Check DEPLOYMENT.md for detailed instructions
2. Check README.md for API documentation
3. Check server.js comments for code details

**Your website is now enterprise-ready! 🚀**

---

**Last Updated:** June 2026  
**Version:** 1.0.0 Production Ready
