#  Deal Matching Backend (Express.js + MongoDB)

This is a backend system for managing investment deals, matching investors with relevant opportunities, tracking investments, and generating analytics.

The system is built using Node.js, Express.js, and MongoDB with a focus on clean API design, scalable architecture, and efficient database usage.

---

##  Features

###  Authentication System
- JWT-based login & register
- Role-based access (Investor, Corporate, Admin)
- Password hashing using bcrypt

---

###  Deal Management (Corporate Side)
- Create, update, and view investment deals
- Soft status management:
  - OPEN
  - PARTIALLY_FILLED
  - CLOSED
- Auto status update based on funding progress

---

###  Investor System
- Investor profile with:
  - Risk appetite
  - Preferred industries
  - Budget range
- Tracks investment history

---

###  Smart Deal Matching
Endpoint:

Scoring Logic:
- Risk match → 30%
- Industry match → 25%
- Budget compatibility → 20%
- ROI attractiveness → 15%
- Popularity → 10%

Returns sorted deals based on match score.

---

###  Investment Engine
- Investors can invest in deals
- Prevents over-investment
- Updates currentRaisedAmount dynamically
- Handles deal closure automatically

---

###  Analytics Module
Provides insights like:
- Total deals created
- Total investments
- Total amount raised
- Conversion rate (closed deals vs total deals)

---

###  Filtering & Pagination
Supports:
- Industry filter
- Risk filter
- ROI range filter
- Sorting (ROI, date, popularity)
- Pagination (page & limit)

Example:

---

###  Background Job System
A background job runs periodically to:
- Update deal status automatically
- Sync funding progress
- Mark deals as CLOSED when target is reached

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Helmet
- CORS

---

##  Project Structure
src/
├── config/
├── models/
├── routes/
├── controllers/
├── middleware/
├── utils/
├── jobs/
server.js



---

##  Key Design Decisions

- Business logic kept inside controllers for simplicity
- MongoDB aggregation used for analytics
- Pagination implemented using skip & limit
- In-memory matching algorithm for scoring deals
- Background job used for automatic status updates

---

##  Performance Considerations

- Indexed query support for industry and risk level
- Pagination avoids large dataset loads
- Selective field fetching in queries
- Reduced in-memory processing where possible

---

##  How to Run
npm install
npm run dev


Create `.env` file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret