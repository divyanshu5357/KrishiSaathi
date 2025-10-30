const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.static(__dirname)); // Serve static files from current directory

// ========================================================================
// --- PASTE YOUR API KEYS HERE ---
//
// Get OpenWeatherMap key from https://openweathermap.org/
// Get Gemini API key from https://makersuite.google.com/app/apikey
// ========================================================================
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
// ========================================================================


// --- Root Route - Redirect to HTML ---
app.get('/', (req, res) => {
    res.redirect('/KrishiSaathi.html');
});

// --- API Endpoint for Weather ---
app.get('/api/weather', async (req, res) => {
    const location = req.query.location;

    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

    if (!OPENWEATHERMAP_API_KEY) {
        return res.status(400).json({ error: 'Server is missing API key. Please set OPENWEATHERMAP_API_KEY in .env' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
    console.log(`[weather] Fetching for "${location}" -> ${apiUrl}`);

    try {
        const weatherResponse = await fetch(apiUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            // Forward the error from OpenWeatherMap
            const statusCode = typeof weatherData.cod === 'number' ? weatherData.cod : (typeof weatherData.cod === 'string' ? parseInt(weatherData.cod) : 500);
            return res.status(statusCode).json({ error: weatherData.message || 'Failed to fetch weather data' });
        }

        // Format the data to send to the frontend
        const formattedData = {
            location: `${weatherData.name}, ${weatherData.sys.country}`,
            temp: weatherData.main.temp,
            desc: weatherData.weather[0].main,
            humidity: weatherData.main.humidity,
            wind: weatherData.wind.speed * 3.6, // Convert m/s to km/h
            rain: weatherData.rain ? weatherData.rain['1h'] : 0, // Rain in the last 1 hour
            icon: weatherData.weather[0].icon
        };

        res.json(formattedData);

    } catch (error) {
        console.error('Server error fetching weather:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// --- API Endpoint for Gemini Chat Assistant ---
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (!GEMINI_API_KEY) {
        return res.status(400).json({ error: 'Server is missing Gemini API key. Please set GEMINI_API_KEY in .env' });
    }

    const modelsToTry = [
        'gemini-2.5-flash-preview-09-2025',
        'gemini-1.5-flash',
        'gemini-1.5-pro'
    ];

    const systemPrompt = 'You are KrishiSaathi AI, a helpful agricultural assistant for Indian farmers. Provide concise, actionable advice about farming, crops, weather, market prices, and related topics in India.';

    for (const model of modelsToTry) {
        try {
            console.log(`[chat] Message received. Trying model: ${model}`);
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

            const requestBody = {
                contents: [{
                    role: 'user',
                    parts: [ { text: `${systemPrompt}\n\nUser: ${message}` } ]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 512
                }
            };

            const response = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                let errorData = {};
                try { errorData = await response.json(); } catch {}
                const details = errorData?.error?.message || response.statusText;
                console.warn(`[chat] Model ${model} failed: ${response.status} ${details}`);
                // If model not found or similar, try next; otherwise bubble up
                if ([400, 404].includes(response.status)) {
                    continue; // try next model
                }
                return res.status(response.status).json({ error: 'Failed to get response from AI assistant', details });
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                return res.json({ response: text, modelUsed: model });
            }
            console.warn(`[chat] Model ${model} returned empty/invalid response format.`);
            // try next model
        } catch (err) {
            console.warn(`[chat] Error with model, trying next: ${err?.message || err}`);
            // try next model
        }
    }

    return res.status(502).json({ error: 'Failed to get response from AI assistant', details: 'All models failed or unavailable' });
});

// --- Health Check ---
app.get('/api/health', (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

// Frontend config for client to know API base URL in production if needed
app.get('/api/config', (req, res) => {
    res.json({
        apiBaseUrl: process.env.CLIENT_API_BASE_URL || ''
    });
});


// --- API Endpoint for Market Prices (Simulation) ---
app.get('/api/marketprices', (req, res) => {
    // This is just a simulation. In a real app, you'd fetch from a database.
    const simulatedData = [
        { name: 'Wheat', mandi: 'Panchkula Mandi', price: 2050 + Math.floor(Math.random() * 100 - 50), trend: Math.random() > 0.5 ? 'up' : 'down', trendPercent: (Math.random() * 2).toFixed(1) },
        { name: 'Rice (Basmati)', mandi: 'Karnal Mandi', price: 3200 + Math.floor(Math.random() * 200 - 100), trend: Math.random() > 0.5 ? 'up' : 'down', trendPercent: (Math.random() * 2).toFixed(1) },
        { name: 'Cotton', mandi: 'Hisar Mandi', price: 6500 + Math.floor(Math.random() * 300 - 150), trend: 'up', trendPercent: 0.8 },
        { name: 'Sugarcane', mandi: 'State Price', price: 380, trend: 'none', trendPercent: 0.0 },
        { name: 'Mustard', mandi: 'Rewari Mandi', price: 5400 + Math.floor(Math.random() * 100 - 50), trend: 'up', trendPercent: (Math.random() * 2).toFixed(1) },
    ];
    
    res.json(simulatedData);
});


// Start the server
app.listen(port, () => {
    console.log(`KrishiSaathi backend server is running on http://localhost:${port}`);
    console.log(`Open http://127.0.0.1:${port}/KrishiSaathi.html in your browser`);
    console.log('Waiting for requests from the app...');
    console.log('\nIMPORTANT: Add your API keys to the .env file:');
    console.log('- OPENWEATHERMAP_API_KEY (get from https://openweathermap.org/api)');
    console.log('- GEMINI_API_KEY (get from https://makersuite.google.com/app/apikey)');
});

