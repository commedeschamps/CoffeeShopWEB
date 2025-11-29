# ☕ CoffeeShop Web Application

Modern coffee shop web application with full-featured catalog, shopping cart, and order management.

## 🎨 New Features

### User-Friendly Interface
- **Visual Product Cards** with high-quality images
- **Category Filtering** (All, Beverages, Desserts, Meals)
- **Shopping Cart** with real-time updates
- **Customization Modal** for drinks (milk, syrups, toppings)
- **Responsive Design** - works on desktop and mobile

### Full Functionality
- ✅ Browse complete menu with images and descriptions
- ✅ Filter products by category
- ✅ Add items to cart
- ✅ Customize beverages (milk type, syrups, extra shot, etc.)
- ✅ Adjust quantities in cart
- ✅ View order summary with pricing
- ✅ Place orders via API

## 🚀 Quick Start

### Backend (Spring Boot)

1. **Prerequisites:**
   - JDK 17
   - Maven

2. **Run:**
   ```bash
   cd C:\Users\jungk\Downloads\shop
   .\mvnw.cmd spring-boot:run
   ```

3. **API Endpoints:**
   - `GET /catalog` - Full product catalog with images
   - `GET /menu` - Simple price list
   - `POST /order` - Simple order
   - `POST /order/custom` - Order with customizations

### Frontend (React + Vite)

1. **Prerequisites:**
   - Node.js 16+

2. **Install & Run:**
   ```bash
   cd coffeeshop-ui
   npm install
   npm run dev
   ```

3. **Access:**
   - Open http://localhost:5173

## 📱 How to Use

1. **Browse Menu:**
   - Click category buttons to filter items
   - View product images, names, descriptions, and prices

2. **Add to Cart:**
   - Click "Add" for simple items
   - Click "Customize" for beverages to add milk, syrups, etc.

3. **Manage Cart:**
   - Click cart button (🛒) in header
   - Adjust quantities with +/- buttons
   - Remove items with trash icon
   - View total price

4. **Place Order:**
   - Click "Place Order" in cart
   - View order confirmation with receipt

## 🎯 Design Patterns Implemented

- **Facade** - `CoffeeShopFacade` simplifies complex ordering
- **Builder** - `OrderBuilder` for constructing orders
- **Decorator** - Add-ons for beverages (milk, syrups, toppings)
- **Factory** - `MenuFactory` creates menu items
- **Strategy** - Pricing strategies (discounts)
- **Observer** - Order status notifications
- **Adapter** - Payment processor integration

## 📦 Product Categories

### ☕ Beverages (Customizable)
- Espresso, Latte, Cappuccino, Americano
- Iced Latte
- Black Tea, Green Tea, Herbal Tea
- Hot Chocolate, Lemonade

### 🍰 Desserts
- Cheesecake, Brownie
- Muffin, Croissant

### 🥗 Meals
- Sandwich, Fresh Salad, Lunchbox

## 🛠️ Tech Stack

**Backend:**
- Spring Boot 3.5.8
- Java 17
- Maven

**Frontend:**
- React 18
- Vite
- CSS3 (Modern Gradients & Animations)

## 📸 Features Showcase

- **Product Images:** Fetched from Unsplash
- **Smooth Animations:** Hover effects, slide-in cart, scale modals
- **Dark Theme:** Coffee-inspired color palette
- **Icons:** Emoji-based for quick recognition

## 🔧 Configuration

### CORS
Backend allows requests from `http://localhost:5173`

### API Base URL
Frontend configured for `http://localhost:8080`

## 📝 License

Educational project for design patterns demonstration.

