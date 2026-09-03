# 🌾 KrishiLink

### Right Price. Right Buyer. Right Time.

KrishiLink is an AI-assisted digital marketplace designed to strengthen market linkages and price discovery for farmers.

The platform helps farmers discover better market opportunities, connect with suitable buyers, compare crop quality, understand logistics costs, estimate net earnings, and track their deals from one place.

---

## 🚜 Problem Statement

### Strengthening market linkages and price discovery for farmers

Farmers often face challenges such as:

- Lack of transparent market price information
- Difficulty finding suitable buyers
- Limited ability to compare different market opportunities
- Uncertainty about transportation and logistics costs
- Difficulty calculating actual net earnings after transportation
- Limited digital connection between farmers and buyers
- Difficulty comparing crop quality before making a deal

KrishiLink aims to solve these challenges through a single digital platform connecting farmers, buyers, and platform administrators.

---

# 💡 Our Solution

KrishiLink provides a farmer-centric marketplace where farmers can:

1. Check market prices
2. Analyze price trends
3. Create crop lots
4. Get AI-assisted buyer recommendations
5. Compare suitable buyers
6. Compare crop quality
7. Estimate logistics costs
8. Calculate expected net earnings
9. Track deals and payment status
10. Access a centralized farmer dashboard

### 🎯 USP

> **"Farmer ko sirf price nahi, balki AI ke through batata hai ki kahan, kab aur kis buyer ko crop sell karna better rahega."**

### Core Value Proposition

> **Right Price. Right Buyer. Right Time.**

---

# ✨ Key Features

## 👨‍🌾 1. Farmer Dashboard

The Farmer Dashboard provides a centralized workspace for farmers.

Farmers can access:

- Market Intelligence
- My Crop Lots
- AI Recommendations
- Offers
- Deals
- Logistics
- Payments
- Profile

This reduces the need to use multiple platforms for different selling activities.

---

# 📊 2. Market Price Intelligence

KrishiLink allows farmers to compare crop prices across different markets.

### Example

| Market | Price |
|---|---:|
| Nashik | ₹25/kg |
| Pune | ₹27/kg |
| Mumbai | ₹29/kg |

This helps farmers understand potential selling opportunities in different markets.

> **Note:** Prices shown in the current prototype are demonstration/sample data.

---

# 📈 3. Price Trend Analysis

The platform can visualize crop price trends to help farmers understand market movement.

Farmers can use this information while deciding whether to:

- Sell immediately
- Wait for a potentially better opportunity
- Compare another market

Price predictions are estimates and should not be considered guaranteed future prices.

---

# 📦 4. Create Crop Lot

Farmers can create a crop lot by entering important crop details.

### Crop Lot Information

- Crop
- Quantity
- Quality Grade
- Location

### Example

```text
Crop: Onion
Quantity: 5,000 kg
Quality: Grade A
Location: Nashik

🏗️ System Workflow
                    ┌──────────────────┐
                    │      FARMER      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Create Crop Lot │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Market Price &   │
                    │ Price Intelligence│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ AI Buyer Matching│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Buyer Offer      │
                    │ & Deal           │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Quality & Buyer  │
                    │ Comparison       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Logistics        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Net Earnings &   │
                    │ Payment Tracking │
                    └──────────────────┘
🧑‍💻 Technology Stack
Frontend
•React.js
•Vite
•Tailwind CSS
•Lucide React
•Recharts

Current Prototype Architecture
The current version is a frontend-based functional prototype.

It uses:
React State
LocalStorage
Mock/Demo Data
Client-side navigation

📁 Project Structure
krishilink-demo/
│
├── src/
│   ├── components/
│   │   ├── AppShell.jsx
│   │   └── ui.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PortalDashboards.jsx
│   │   └── FarmerPages.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md

🔐 User Roles

KrishiLink currently supports three demo roles.

👨‍🌾 Farmer

Farmers can:
•View market prices
•Analyze price trends
•Create crop lots
•Get buyer recommendations
•View offers
Track deals
Estimate logistics
Track payments

🏢 Buyer

Buyers can:
•Manage requirements
•View matching crop lots
•Compare crop quality
•View crop lot details
•Prepare offers
•Track deals

🛡️ Admin

Admins can:
•Manage users
•Verify buyers
•Monitor transactions
•Handle complaints
•Manage disputes
•View platform analytics

🚀 Future Scope

KrishiLink can be extended into a complete production-ready agricultural marketplace.

Future Enhancements

•Real-time Mandi/APMC price APIs
•Government agriculture datasets
•Real farmer and buyer verification
•Backend API
•Database integration
•Secure authentication
•Real-time notifications
•Transporter onboarding
•GPS-based logistics estimation
•Online payment gateway
•Multilingual interface
•Voice-based farmer assistance
•Advanced ML-based price forecasting
•FPO and cooperative integration
•WhatsApp/SMS notifications
•Mobile application
•AI-powered market advisory

🔒 Data & Prototype Disclaimer

KrishiLink is currently a hackathon prototype.
Some information displayed in the prototype may include:
•Market prices
•Buyer information
•Farmer information
•Quality parameters
•Match scores
•Logistics costs
•Payment information

These values are used for demonstration purposes.

The prototype should not be treated as a source of guaranteed real-time agricultural prices, guaranteed price predictions, verified commercial offers, or actual payment processing.

🎯 Expected Impact

KrishiLink aims to help farmers:
•Improve price transparency
•Discover better market opportunities
•Find suitable buyers
•Reduce information asymmetry
•Compare crop quality
•Understand transportation costs
•Estimate net realization
•Make better-informed selling decisions

For buyers, KrishiLink provides a structured platform to discover and compare crop lots based on price, quality, quantity, location, and matching requirements.

👥 Team
Team Interpreter'X
Project Name: KrishiLink
Tagline: Right Price. Right Buyer. Right Time.
Problem Statement: Strengthening market linkages and price discovery for farmers
Theme: Agriculture, FoodTech & Rural Development
Category: Software
Team Members
Aditya Devade
Ruturaj Deshmukh 
Pruthviraj Gayke
Makrand Kale
Pranav Daure
Ananya Sinha

📜 License
This project has been developed as a hackathon prototype for educational, innovation, and demonstration purposes.