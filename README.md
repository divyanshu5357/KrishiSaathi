# KrishiSaathi - Smart Farming Assistant

A comprehensive farming assistance web application for Indian farmers, providing weather updates, market prices, crop suggestions, and AI-powered farming advice.

## Features

- 📱 **User Authentication**: Sign up and login with profile management
- 🌦️ **Weather Information**: Real-time weather data for your location
- 💰 **Market Prices**: Live agricultural market prices
- 🌾 **Crop Suggestions**: Personalized crop recommendations based on location
- 🚜 **Equipment Rental**: Browse and book farming equipment
- 🤖 **AI Assistant**: Chat with AI for farming advice (powered by Google Gemini)
- 🌍 **Multi-language Support**: English, Hindi, Punjabi, and Marathi
- 📊 **Government Schemes**: Information about farming schemes

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenWeatherMap API Key
- Google Gemini API Key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

Edit the `.env` file and add your API keys:

```env
PORT=3000
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_API_BASE_URL=
```

#### Getting API Keys:

**OpenWeatherMap API Key:**
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key

**Google Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key
4. Copy your API key

### 3. Start the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`

### 4. Open the Application

Open `KrishiSaathi.html` in your web browser, or you can access it at:
```
http://127.0.0.1:3000/KrishiSaathi.html
```

**Note:** Make sure to open the HTML file through a web server (not file:// protocol) to avoid CORS issues.

## Usage

1. **Sign Up**: Create a new account with your details and farming profile
2. **Login**: Access your account with phone number and password
3. **Dashboard**: View weather, soil info, market prices, and alerts
4. **Weather**: Get detailed weather information for any location
5. **Market**: Check current market prices for various crops
6. **Techniques**: Learn about crop-specific farming techniques
7. **AI Assistant**: Ask farming-related questions and get instant advice
8. **Equipment**: Browse and book farming equipment rental
9. **Schemes**: Check eligibility for government farming schemes

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **APIs**: 
  - OpenWeatherMap API (Weather data)
  - Google Gemini API (AI Assistant)
- **Storage**: LocalStorage (for demo purposes)

## Project Structure

```
KrishiSaathi/
├── KrishiSaathi.html    # Main HTML file with embedded CSS
├── KrishiSaathi.js      # Old JavaScript file (deprecated)
├── server.js            # Node.js backend server
├── package.json         # Node.js dependencies
├── .env                 # Environment variables (API keys)
├── .env.example         # Example environment file
└── README.md            # This file
```

## Important Notes

- ⚠️ **Security Warning**: This application uses localStorage for storing user data, which is NOT secure for production use.
- ⚠️ **API Keys**: Never commit your `.env` file with real API keys to version control.
- ⚠️ **CORS**: Make sure to serve the HTML file through a web server, not directly from the file system.
- 📱 **Responsive Design**: Best viewed on mobile devices or in mobile view in browser dev tools.

## Troubleshooting

### Issue: "Failed to load resource: the server responded with a status of 404"
**Solution**: Make sure the server is running (`node server.js`) and you're accessing the application through `http://127.0.0.1:3000/`

### Issue: "Server is missing API key"
**Solution**: Add your API keys to the `.env` file as described in the setup instructions.

### Issue: "CORS error" or "Failed to fetch"
**Solution**: Make sure you're opening the HTML file through a web server (http://), not directly from the file system (file://)

### Issue: Weather/AI features not working
**Solution**: 
1. Check that the server is running
2. Verify your API keys are correctly set in `.env`
3. Check the browser console for specific error messages

## Future Enhancements

- [ ] Secure backend authentication with JWT
- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Push notifications for weather alerts
- [ ] Offline mode support
- [ ] Mobile app (React Native/Flutter)
- [ ] Integration with more agricultural APIs
- [ ] Community forum for farmers
- [ ] Crop disease detection using ML

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available for educational purposes.

## Contact

For questions or support, please contact the development team.

---

**Made with ❤️ for Indian Farmers**
