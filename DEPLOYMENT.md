# Deployment Guide - Daylight Detailing

Choose one of the following platforms to deploy your website online.

## Quick Start Checklist

- [ ] Have your GitHub repository ready
- [ ] `package.json` and `server.js` in root directory
- [ ] Database will be created automatically on first run
- [ ] Images folder accessible from root

---

## 🎯 Option 1: Render (EASIEST - FREE)

**Best for:** Free hosting, automatic deployments, great performance

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add backend and database"
   git push
   ```

2. **Go to [render.com](https://render.com) and sign up with GitHub**

3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Choose deploy from GitHub

4. **Configure Settings:**
   - **Name:** `daylight-detailing`
   - **Environment:** `Node`
   - **Region:** `Sydney` (or closest to you)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your site is now live at `https://your-project-name.onrender.com`

### Add Custom Domain (Render):
- Go to Settings → Custom Domain
- Add your domain (e.g., `daylight-detailing.com.au`)
- Update DNS records at your domain provider

---

## 🚀 Option 2: Vercel (Free with Limitations)

**Best for:** Speed, but SQLite limited (see notes)

### Steps:

1. **Push to GitHub** (same as above)

2. **Go to [vercel.com](https://vercel.com) and sign up with GitHub**

3. **Create New Project:**
   - Click "Add New" → "Project"
   - Select your repository
   - Import

4. **Configure:**
   - **Framework:** Other
   - **Build Command:** Leave empty
   - **Output Directory:** `.`

5. **Deploy!**

### ⚠️ Important Note for Vercel:
Vercel's free tier doesn't support persistent file storage (your SQLite database will be lost after each deployment). 

**To fix this, use one of:**
- **Turso** (SQLite in the cloud) - $9/month
- **PlanetScale** (MySQL) - Free tier
- **Fly.io** (better file persistence) - $6/month

---

## 🚁 Option 3: Railway (FREE - $5 credit/month)

**Best for:** Easy setup, 750 hours free tier

### Steps:

1. **Push to GitHub**

2. **Go to [railway.app](https://railway.app) and sign up**

3. **Create New Project:**
   - Click "Create New"
   - Select "GitHub Repo"
   - Choose your repository

4. **Add Variables (optional):**
   - No environment variables needed for basic setup

5. **Deploy!**
   - Railway automatically deploys
   - Your site is live within minutes

### Add Custom Domain:
- Project Settings → Custom Domain
- Add your domain

---

## ✅ Option 4: AWS (Reliable, but more complex)

Skip this for now - use Render or Railway instead. AWS is overkill for a small business site.

---

## 📊 Database - IMPORTANT

Your website uses SQLite for data storage. Here's what you need to know:

### Local (Development)
- Database: `daylight.db` (automatically created)
- No setup needed - just run `npm start`

### Production
**Problem:** Most cloud platforms delete files between deployments.

**Solution - Choose One:**

1. **Turso (Recommended)**
   - SQLite in the cloud
   - $0/month (free tier)
   - Easy migration: `turso` CLI tool
   - Update connection string in server.js

2. **PlanetScale**
   - MySQL (not SQLite, but similar)
   - Free tier available
   - Need to update database.js for MySQL

3. **Fly.io**
   - Supports persistent storage
   - $6/month minimum
   - Better performance

For now, **Render with local SQLite** works fine (database persists on their standard tier).

---

## 🔄 After Deployment

### 1. Test Your Site
- Visit your deployment URL
- Test contact form
- Test reviews

### 2. Set Up Custom Domain
- Purchase domain from registrar (GoDaddy, NameCheap, Google Domains, etc.)
- Follow your hosting provider's domain setup guide
- DNS changes take 24-48 hours to propagate

### 3. Email Notifications (Optional)
- Contact form submissions are stored in database
- To get email alerts when customers contact you, add:
  - Twilio for SMS
  - SendGrid for email
  - Or check database manually

### 4. Backups
- Download your `daylight.db` regularly
- Store in Google Drive or OneDrive

---

## 🛠 Troubleshooting

### "npm start" fails locally
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database errors on production
- Render may need more storage
- Check logs in deployment dashboard
- Contact platform support

### Contact form not working
- Check browser console for errors (F12)
- Check server logs
- Ensure API endpoint is reachable

### CORS errors
- Update `app.use(cors())` in server.js
- For production, specify allowed origins instead of all

---

## 📝 Maintenance

### Monitor Your Site
1. Keep Render/Railway logs open occasionally
2. Check that reviews and submissions are being stored
3. Test form monthly

### Updates
- To update code: push to GitHub → automatic redeploy
- To update images: push files to Images/ folder

### Backups
```bash
# Backup your database regularly
cp daylight.db daylight.db.backup
```

---

## 🎓 Learning Resources

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://railway.app/docs)
- [Express.js Guide](https://expressjs.com)
- [SQLite Docs](https://www.sqlite.org/docs.html)

---

**Questions?** Check your platform's support docs or email support@yourplatform.com

**Last Updated:** June 2026
