# 🚀 Quick Start Guide

## ✅ What's New

Your CoffeeShop now has a **MODERN UI** with:
- 📸 **Product images** from Unsplash
- 🎨 **Visual cards** instead of code inputs
- 🛒 **Shopping cart** with customization
- 📱 **Mobile-friendly** responsive design
- ⚡ **Smooth animations** and effects

## 🔧 Setup Steps

### 1. Start Backend (Java/Spring Boot)

```powershell
# Navigate to project root
cd C:\Users\jungk\Downloads\shop

# Make sure JAVA_HOME is set to JDK 17
$env:JAVA_HOME = "C:\Path\To\Your\JDK17"

# Run Spring Boot
.\mvnw.cmd spring-boot:run
```

✅ Backend will start on **http://localhost:8080**

### 2. Start Frontend (React/Vite)

```powershell
# Open new terminal, navigate to UI folder
cd C:\Users\jungk\Downloads\shop\coffeeshop-ui

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

✅ Frontend will open on **http://localhost:5173**

## 🎯 How to Use the New UI

### Browse Products
1. Open http://localhost:5173 in browser
2. Click category buttons: **All**, **Beverages**, **Desserts**, **Meals**
3. See beautiful product cards with images

### Add Items to Cart
- **Simple items:** Click "➕ Add" button
- **Customizable drinks:** Click "🎨 Customize" to add:
  - 🥛 Milk type (Whole, Oat, Almond, Coconut)
  - 🍯 Syrup (Caramel, Vanilla, Hazelnut, Chocolate)
  - ⚡ Extra shot
  - 🍦 Whipped cream
  - 🌿 Cinnamon

### Manage Cart
1. Click **🛒 Cart** button in header
2. Adjust quantities with **+/-** buttons
3. Remove items with **🗑️** icon
4. See real-time total calculation

### Place Order
1. Review your cart
2. Click **"📤 Place Order"**
3. Get order confirmation with receipt

## 🎨 Features Overview

| Feature | Description |
|---------|-------------|
| **Product Images** | Real photos from Unsplash |
| **Categories** | Filter by Beverages/Desserts/Meals |
| **Customization** | Add toppings to drinks |
| **Cart** | Sidebar with quantities |
| **Responsive** | Works on phone/tablet/desktop |
| **Animations** | Smooth hover & transitions |

## 🔍 API Endpoints Used

- `GET /catalog` - Full product list with images ✨ **NEW**
- `POST /order/custom` - Order with customizations

## 💡 Tips

- **Categories:** Click to filter products quickly
- **Customize button:** Only appears for beverages
- **Cart counter:** Shows total items in header
- **Hover effects:** Product cards lift on hover
- **Mobile:** Swipe categories, tap to add

## 🐛 Troubleshooting

### Backend won't start
- Check JAVA_HOME points to JDK 17
- Verify port 8080 is free

### Frontend won't start
- Run `npm install` first
- Check Node.js version (16+)
- Verify port 5173 is free

### Images not loading
- Check internet connection (images from Unsplash)
- Backend must be running for API calls

### CORS errors
- Restart backend if you changed ports
- Check CoffeeShopController has `@CrossOrigin`

## 🎉 Enjoy!

Your coffee shop is now fully functional with a modern e-commerce interface!

