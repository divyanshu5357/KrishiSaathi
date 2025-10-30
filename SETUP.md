# Quick Setup Guide for KrishiSaathi

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Get API Keys

### OpenWeatherMap API Key (Required for Weather Features)
1. Go to: https://openweathermap.org/api
2. Click "Sign Up" (free account)
3. Verify your email
4. Go to "API Keys" section
5. Copy your API key

### Google Gemini API Key (Required for AI Assistant)
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your API key

## Step 3: Configure .env File

Open the `.env` file and replace the placeholder values:

```env
PORT=3000
OPENWEATHERMAP_API_KEY=your_actual_key_here
GEMINI_API_KEY=your_actual_key_here
CLIENT_API_BASE_URL=
```

**Example (with fake keys):**
```env
PORT=3000
OPENWEATHERMAP_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
GEMINI_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
CLIENT_API_BASE_URL=
```

## Step 4: Start the Server
```bash
node server.js
```

You should see:
```
KrishiSaathi backend server is running on http://localhost:3000
Open http://127.0.0.1:3000/KrishiSaathi.html in your browser
```

## Step 5: Open the App

Open your web browser and go to:
```
http://127.0.0.1:3000/KrishiSaathi.html
```

## Troubleshooting

### "Server is missing API key" error
- Make sure you added your actual API keys to the `.env` file
- Don't leave them as `your_openweathermap_api_key_here`
- Restart the server after adding keys

### Cannot access the page
- Make sure the server is running (`node server.js`)
- Use `http://127.0.0.1:3000/KrishiSaathi.html` not `file://...`

### Weather not loading
- Check that OPENWEATHERMAP_API_KEY is set correctly in `.env`
- Make sure your API key is activated (can take a few minutes)
- Check the browser console for error messages

### AI Assistant not working
- Check that GEMINI_API_KEY is set correctly in `.env`
- Verify your Gemini API key is valid
- Check the browser console for error messages

## Testing Without API Keys

The app will work partially without API keys:
- ✅ User authentication
- ✅ Equipment rental browsing and booking
- ✅ Mock market prices (default data)
- ✅ Crop suggestions
- ✅ Farming techniques
- ❌ Real-time weather data
- ❌ AI chat assistant

To test, just start the server and use the app. You'll see warnings about missing API keys.

## Need Help?

Check the main README.md file for detailed information.
