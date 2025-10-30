const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const location = req.query.location;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    if (!OPENWEATHERMAP_API_KEY) {
        console.error('[weather] Missing OPENWEATHERMAP_API_KEY');
        return res.status(500).json({ error: 'Weather service configuration error' });
    }

    try {
        console.log(`[weather] Fetching for location: ${location}`);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

        const response = await fetch(weatherUrl);

        if (!response.ok) {
            let errorData = {};
            try { errorData = await response.json(); } catch {}
            const errorMsg = errorData?.message || response.statusText;
            console.error(`[weather] API error: ${response.status} ${errorMsg}`);
            return res.status(response.status).json({ error: errorMsg });
        }

        const data = await response.json();
        console.log(`[weather] Success for ${location}`);

        // Format response
        const weatherData = {
            location: data.name || location,
            temperature: Math.round(data.main?.temp || 0),
            condition: data.weather?.[0]?.description || 'N/A',
            humidity: data.main?.humidity || 0,
            windSpeed: data.wind?.speed || 0,
            icon: data.weather?.[0]?.icon || '01d',
            rain: data.rain?.['1h'] || 0
        };

        return res.status(200).json(weatherData);

    } catch (error) {
        console.error('[weather] Error:', error.message);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
