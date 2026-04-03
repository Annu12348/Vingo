🚀 Features

🔐 Authentication System
1. Role-based authentication with Owner, User, and Delivery Boy.
2. Supports Email/Password login and Google Authentication.
3. Secure password hashing using Bcrypt.
4. Forgot Password functionality with OTP verification.
5. Email OTP system with 5-minute expiration using Nodemailer and Brevo.
6. Password reset allowed only after OTP verification.

📍 Location Tracking
1. Displays current user location in the navbar for all roles.
2. Integrated Google Maps for real-time location tracking similar to food delivery platforms.

👨‍💼 Owner Panel
1. Owners can create, update, and delete their own shops.
2. Shop management is restricted to the owner who created it.
3. Owners can create, update, and delete food items linked to their shop.
4. When a user places an order from multiple shops, each shop owner receives their own order request.
5. Real-time order requests are received using Socket.io without page refresh.
6. Owners can update order status:
    1. Pending
    2. Preparing
    3. Out for Delivery
    4. Delivered
7. Order status updates are synchronized in real-time between owner and user.
8. When status becomes Out for Delivery, delivery requests are sent to available delivery partners.

👤 User Panel
1. Users can view all shops and food items created by different owners.
2. Only authenticated users can place orders.
3. Users can place orders from multiple shops in a single session.
4. Orders are sent to the corresponding shop owners only.
5. Users can track real-time order status updates.
6. Online payment and Cash on Delivery options available.
7. Integrated Google Maps to track delivery location.
8. Users can only see their own orders (ID-based filtering).

🚚 Delivery Boy Panel
1. Delivery partners receive real-time delivery requests when owners mark orders as Out for Delivery.
2. If multiple delivery partners are online, the first one to accept the request gets the order.
3. Once accepted, the delivery partner can see:
   1. Customer details
   2. Shop details
   3. Delivery location
4. Real-time map comparison ensures delivery partner and user are at the same location before delivery confirmation.
5. Delivery confirmation uses OTP verification from the user.
6. After successful OTP verification, the order is marked Delivered in real-time for both owner and user.
   1. Dashboard displays:
   2. Today's total earnings
   3. Overall total earnings
7. Shows No assignments available when no delivery requests are pending.

🛠 Tech Stack
1. Frontend
   1. React.js
   2. Redux Toolkit
   3. Tailwind CSS

2. Backend
   1. Node.js
   2. Express.js
   3. MongoDB Atlas
   4. Mongoose

3. Authentication & Security
   1. JWT
   2. Bcrypt
   3. Firebase (Google Authentication)

4. Real-Time & Communication
   1. Socket.io
   2. Nodemailer
   3. Brevo

5. Maps & Location
   1. Google Maps API   

⭐ Key Highlights
1. Role-based system (Owner / User / Delivery Boy)
2. Real-time order updates using Socket.io
3. OTP-based password reset
4. OTP-based delivery confirmation
5. Google Maps delivery tracking
6. Multi-shop ordering system
7. Secure authentication using JWT   

===============================================================================================================================
improve version 


# 🍔 Food Delivery Platform (MERN Stack)

A full-stack food delivery web application built using the MERN stack with role-based authentication for Users, Owners, and Delivery Partners. The platform supports real-time order updates, delivery tracking, OTP verification, and online payments.

---

# 🚀 Features

## 🔐 Authentication System

* Role-based authentication (Owner / User / Delivery Boy)
* Email & Password login
* Google Authentication
* JWT Authentication
* Secure password hashing using Bcrypt
* Forgot Password with OTP verification
* Email OTP system with expiration
* Password reset after OTP verification

---

## 🏠 Public Pages

* Home Page
* Restaurants Page
* Contact Page
* Login / Signup

Users can browse restaurants and food items without logging in.

---

## 👤 User Panel

* View all restaurants and food items
* Add items to cart
* Place orders from multiple restaurants
* Online payment and Cash on Delivery
* Real-time order status tracking
* Google Maps delivery tracking
* Users can view only their own orders
* Order status updates in real-time using Socket.io

---

## 👨‍💼 Owner Panel

* Create, update, and delete shops
* Create, update, and delete food items
* Receive order requests in real-time
* Update order status:

  * Pending
  * Preparing
  * Out for Delivery
  * Delivered
* Multi-shop order handling (each owner receives their own order)
* Real-time order updates with Socket.io

---

## 🚚 Delivery Partner Panel

* Receive delivery requests in real-time
* First delivery partner to accept gets the order
* View customer details and shop details
* View delivery location on Google Maps
* Delivery confirmation using OTP verification
* Earnings dashboard:

  * Today's earnings
  * Total earnings
* Shows "No assignments available" when no delivery requests

---

## 📍 Maps & Location

* User location displayed in navbar
* Google Maps integration
* Real-time delivery tracking
* Location comparison before delivery confirmation

---

## 💳 Payment Integration

* Razorpay payment integration
* Online payment support
* Cash on Delivery option

---

## ⚡ Real-Time Features

* Real-time order updates
* Real-time delivery requests
* Real-time order status synchronization
* Socket.io used for real-time communication

---

# 🛠 Tech Stack

## Frontend

* React.js
* Redux Toolkit
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Authentication & Security

* JWT Authentication
* Bcrypt Password Hashing
* Firebase Google Authentication

## Real-Time & Communication

* Socket.io
* Nodemailer
* Brevo (Email Service)

## Maps & Location

* Google Maps API

## Payment

* Razorpay Payment Gateway

---

# 🔄 Order Flow

User → Place Order → Owner Receives Order → Owner Updates Status → Delivery Partner Accepts → Delivery OTP Verification → Order Delivered

---

# 📂 Project Modules

1. Authentication System
2. User System
3. Owner Dashboard
4. Delivery Partner Dashboard
5. Public Website Pages
6. Real-time Order System
7. Payment System
8. Maps & Location Tracking
9. OTP Email System
10. Delivery OTP Verification System

---

# ⭐ Key Highlights

* Multi-role system (Owner / User / Delivery Boy)
* Multi-vendor food ordering system
* Real-time order tracking
* OTP-based password reset
* OTP-based delivery confirmation
* Google Maps delivery tracking
* Razorpay payment integration
* Socket.io real-time system
* Secure authentication using JWT

---

# 🧠 Project Type

This project is a full-stack multi-vendor food delivery platform similar to modern food delivery applications with real-time features and delivery management.

---

# 🏁 Future Improvements

* Admin Panel
* Ratings & Reviews
* Push Notifications
* Invoice PDF
* Coupons & Wallet
* Deployment
* Mobile App (React Native)

---

# 👨‍💻 Author

Full Stack MERN Developer

===============================================================================================================================

add feature ke saath =======>
# 🍔 Food Delivery Web Application (MERN Stack)

A full-featured Food Delivery Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
This project includes User, Restaurant Owner, and Delivery Partner systems with real-time order tracking, online payments, and map integration.

---

## 🚀 Features

### 👤 User Features
- User Signup & Login
- Google Authentication
- Browse Restaurants
- View Restaurant Details
- View Food Items
- Search Restaurants & Foods
- Contact Form
- Online Payment (Razorpay)
- Order Tracking (Realtime)
- Order History

### 🏪 Restaurant Owner Features
- Create Restaurant / Shop
- Update Restaurant Details
- Add Food Items
- Update Food Items
- Delete Food Items
- Receive Orders
- Accept / Reject Orders
- Manage Menu

### 🚚 Delivery Partner Features
- Delivery Partner Login
- View Assigned Orders
- Pickup Order
- Deliver Order
- OTP Verification for Delivery
- Update Delivery Status

---

## 🧩 Modules Completed

| Module | Status |
|--------|--------|
| Authentication System | ✅ |
| OTP Verification | ✅ |
| Google Auth | ✅ |
| Public Home Page | ✅ |
| Restaurants Listing | ✅ |
| Single Restaurant Page | ✅ |
| Food Items Listing | ✅ |
| Search System | ✅ |
| Contact System | ✅ |
| Restaurant Management | ✅ |
| Food Management | ✅ |
| Order System | ⏳ |
| Cart System | ⏳ |
| Payment Integration | ⏳ |
| Delivery System | ⏳ |
| Realtime Tracking | ⏳ |
| Maps Integration | ⏳ |

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router
- Socket.io Client
- Google Maps API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Razorpay Payment Gateway
- Nodemailer (OTP Email)

---

## 📁 Project Structure
