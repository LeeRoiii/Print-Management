const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint example
app.get('/api/health', (req, res) => {
    res.send({ message: 'API is healthy' });
});

// Serve order form directly
app.get('/order-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // Ensure your index.html is in the build directory
});

// Catch-all handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
