# DIG Intelligence - Market Analytics Platform

A institutional-grade market intelligence dashboard for entertainment memorabilia.

## Quick Deploy to Vercel (5 minutes, no coding required)

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com)
2. Click "Sign up" and create a free account

### Step 2: Upload This Project to GitHub
1. Log into GitHub
2. Click the **+** button in the top right → **New repository**
3. Name it: `dig-intelligence`
4. Keep it **Public**
5. Click **Create repository**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files from this folder into the upload area
8. Click **Commit changes**

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel to access your GitHub
4. Click **Add New...** → **Project**
5. Find `dig-intelligence` in your repository list and click **Import**
6. Leave all settings as default
7. Click **Deploy**
8. Wait 1-2 minutes for it to build

### Step 4: Get Your Link
Once deployed, Vercel will give you a URL like:
```
https://dig-intelligence.vercel.app
```

You can share this link with anyone!

### Optional: Custom Domain
If you want a URL like `intelligence.digappraisals.com`:
1. In Vercel, go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS instructions Vercel provides

---

## Project Structure

```
dig-intelligence-vercel/
├── app/
│   ├── globals.css      # Tailwind styles
│   ├── layout.js        # Page layout with fonts
│   └── page.js          # Main dashboard application
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

## Local Development (Optional)

If you want to run this locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

Built for DIG Appraisals · January 2025
