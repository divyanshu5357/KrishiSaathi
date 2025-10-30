# KrishiSaathi - Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository (already done ✅)
- API Keys ready

## Step-by-Step Deployment

### 1. Go to Vercel
Visit https://vercel.com and sign in with GitHub

### 2. Import Your Repository
- Click **"Add New Project"**
- Click **"Import Git Repository"**
- Select your repository: `divyanshu5357/KrishiSaathi`
- Click **"Import"**

### 3. Configure Project Settings
In the import screen:

**Framework Preset:** Select "Other" (not a framework)

**Root Directory:** Leave as `./` (default)

**Build Command:** Leave empty

**Output Directory:** Leave empty

**Install Command:** `npm install`

### 4. Add Environment Variables (IMPORTANT!)
Before deploying, click **"Environment Variables"** and add:

```
OPENWEATHERMAP_API_KEY
```
Value: `your_openweathermap_api_key_here`

```
GEMINI_API_KEY
```
Value: `your_gemini_api_key_here`

```
NODE_ENV
```
Value: `production`

**⚠️ Make sure to add all 3 environment variables!**

### 5. Deploy
- Click **"Deploy"**
- Wait 1-2 minutes for deployment to complete
- You'll get a URL like: `https://krishi-saathi.vercel.app`

### 6. Test Your Deployment
Visit your Vercel URL and test:
- ✅ Login page loads
- ✅ Weather data works
- ✅ Market prices load
- ✅ AI chat responds
- ✅ Language switching works
- ✅ Government schemes links work

## Updating Your Site
After making changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
```
Vercel will automatically redeploy!

## Troubleshooting

### Issue: API not working
**Solution:** Check Environment Variables in Vercel Dashboard
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Verify all 3 variables are set correctly
4. Redeploy if you added variables after initial deployment

### Issue: 404 errors
**Solution:** The `vercel.json` file routes everything correctly - make sure it's committed to GitHub

### Issue: Weather/AI features not working
**Solution:** 
1. Check API keys are valid
2. Regenerate keys if they were exposed
3. Add new keys to Vercel Environment Variables
4. Redeploy the project

## Files Created for Vercel
- ✅ `vercel.json` - Routes configuration
- ✅ `server.js` - Modified to export for serverless
- ✅ `KrishiSaathi.html` - Auto-detects production URL

## Your Project Structure
```
KrishiSaathi/
├── server.js          (Backend - becomes serverless)
├── KrishiSaathi.html  (Frontend)
├── vercel.json        (Vercel config)
├── package.json       (Dependencies)
└── .env              (Local only - NOT deployed)
```

## Important Notes
- ✅ Your `.env` file is NOT uploaded to Vercel (protected by `.gitignore`)
- ✅ Environment variables are set securely in Vercel Dashboard
- ✅ Your API keys remain private
- ✅ Automatic deployments on every `git push`

## Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Support
If you face any issues:
- Check Vercel deployment logs
- Verify environment variables are set
- Check browser console for errors
