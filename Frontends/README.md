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