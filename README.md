# PureLeaf Moringa E-Commerce Website

Complete professional e-commerce solution for PureLeaf Moringa brand.

## Features
- **Frontend**: HTML5, CSS3, Vanilla JS (No frameworks, lightweight).
- **Backend**: Node.js + Express.
- **Database**: JSON file-based storage (Simple & Portable).
- **Admin Panel**: Manage products and orders.

## Project Structure
```
PureLeaf/
├── data/               # Database files (products.json, orders.json)
├── public/             # Frontend Static Files
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript logic
│   ├── images/         # Images
│   └── *.html          # Web Pages
├── server.js           # Backend Server Entry Point
└── package.json        # Dependencies
```

## How to Run Locally
1. Open terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open browser at: `http://localhost:3000`

## Admin Credentials
- **Login URL**: `/login.html` (Button in footer)
- **Username**: `admin`
- **Password**: `admin123`

## Deployment
Ready for deployment on Render, Railway, or Heroku (Node.js hosting).
For Netlify/Vercel (Static), the backend API needs to be adapted to Serverless functions, or use this as a standalone Node app.
For this project, it is configured as a standalone Node.js app.

## Credits
Built for PureLeaf Moringa.
