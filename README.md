# 🪙 Crypto Dashboard

A real-time cryptocurrency dashboard with candlestick charts, volume and market cap analysis — built using React, lightweight-charts, and the CoinGecko API.

---

## 🚀 Features

- 📈 Candlestick chart for visualizing price trends
- 📊 Composite bar/line chart for volume & market cap
- ⚡ Real-time data with React Query (1-hour caching)
- 🔐 Firebase authentication (Google login popup)
- 📱 Responsive layout
- 🧩 Embeddable via microfrontend/iframe approach

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Charts**: `lightweight-charts` / `devextreme-react/chart`
- **Auth**: Firebase
- **Data**: CoinGecko API
- **State Management**: React Query
- **Deployment**: Vercel / Render

---

## 🧱 Project Structure

src/ ├── components/ │ ├── CandleChart.jsx │ ├── VolumeMarketCapChart.jsx ├── hooks/ │ └── useMarketChartData.js ├── utils/ │ └── convertToChartData.js ├── pages/ │ └── CoinDetails.jsx └── App.jsx

yaml
Copy
Edit

---

## 🧪 Getting Started

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
npm install
npm run dev
🔑 Environment Variables
Create a .env file:

env
Copy
Edit
VITE_API_URL=https://api.coingecko.com/api/v3
🔗 Live Demo
Deployed Link: Add your deployed link here

📜 License
This project uses only the open-source-compatible features of all libraries. However, note that devextreme-react may show license prompts in some cases — consider using lightweight-charts if a fully open-source stack is required.

Made with ❤️ by combining open data and clean visualizations.

vbnet
Copy
Edit

Let me know if you want deployment instructions (like for Vercel), chart screenshots, or setup for multiple coins.







