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

    // Simulated market data (in production, this would fetch from a real database/API)
    const marketData = [
        { crop: 'Wheat', price: '₹2,050/quintal', mandi: 'Delhi Mandi', trend: 'up' },
        { crop: 'Rice', price: '₹3,200/quintal', mandi: 'Punjab Mandi', trend: 'stable' },
        { crop: 'Cotton', price: '₹6,800/quintal', mandi: 'Gujarat Mandi', trend: 'down' },
        { crop: 'Sugarcane', price: '₹350/quintal', mandi: 'UP Mandi', trend: 'up' },
        { crop: 'Maize', price: '₹1,850/quintal', mandi: 'MP Mandi', trend: 'stable' },
        { crop: 'Potato', price: '₹1,200/quintal', mandi: 'West Bengal Mandi', trend: 'up' }
    ];

    console.log('[marketprices] Returning simulated market data');
    return res.status(200).json(marketData);
};
