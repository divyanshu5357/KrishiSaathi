const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
        console.error('[chat] Missing GEMINI_API_KEY');
        return res.status(500).json({ 
            error: 'AI service configuration error. Please contact support.',
            reply: 'Sorry, the AI assistant is temporarily unavailable. Please try again later.'
        });
    }

    // Try multiple Gemini models
    const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-pro',
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
                if ([400, 404].includes(response.status)) {
                    continue; // try next model
                }
                return res.status(response.status).json({ error: 'Failed to get response from AI assistant', details });
            }

            const data = await response.json();
            const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';
            console.log(`[chat] Success with model: ${model}`);
            return res.status(200).json({ reply: replyText, model });

        } catch (error) {
            console.error(`[chat] Error with model ${model}:`, error.message);
            continue; // try next model
        }
    }

    // All models failed
    console.error('[chat] All models failed');
    return res.status(500).json({ 
        error: 'AI service temporarily unavailable',
        reply: 'I am having trouble connecting right now. Please try again in a moment.'
    });
};
