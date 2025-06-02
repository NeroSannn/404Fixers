require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mock database (replace with real database later)
let cleanupEvents = [
    {
        id: 1,
        title: 'East Coast Beach Cleanup',
        location: { lat: 1.3099, lng: 103.9131 },
        date: '2025-06-15',
        participants: []
    },
    // Add more events...
];

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// API Routes
app.get('/api/events', (req, res) => {
    res.json(cleanupEvents);
});

app.post('/api/events/join', (req, res) => {
    const { eventId, participant } = req.body;
    const event = cleanupEvents.find(e => e.id === eventId);
    
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    
    event.participants.push(participant);
    // In reality, you'd save this to a database
    
    res.json({ success: true, message: 'Successfully joined event' });
});

app.get('/api/weather/:location', async (req, res) => {
    try {
        // Replace with actual weather API call
        const weatherData = {
            temp: '28°C',
            conditions: 'Sunny',
            tideLevel: 'Low Tide',
            windSpeed: '15 km/h'
        };
        
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`ShoreSquad server running at http://localhost:${port}`);
});
