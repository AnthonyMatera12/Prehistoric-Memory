// Anthony Matera anm326 

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get game data
app.get('/api/game-data', (req, res) => {
    const elements = [
        {symbol: 'H', group: 1, period: 1}, {symbol: 'He', group: 18, period: 1},
        {symbol: 'Li', group: 1, period: 2}, {symbol: 'Be', group: 2, period: 2},
        {symbol: 'B', group: 13, period: 2}, {symbol: 'C', group: 14, period: 2},
        {symbol: 'N', group: 15, period: 2}, {symbol: 'O', group: 16, period: 2},
        {symbol: 'F', group: 17, period: 2}, {symbol: 'Ne', group: 18, period: 2},
        {symbol: 'Na', group: 1, period: 3}, {symbol: 'Mg', group: 2, period: 3},
        {symbol: 'Al', group: 13, period: 3}, {symbol: 'Si', group: 14, period: 3},
        {symbol: 'P', group: 15, period: 3}, {symbol: 'S', group: 16, period: 3},
        {symbol: 'Cl', group: 17, period: 3}, {symbol: 'Ar', group: 18, period: 3}
    ];
    res.json(elements);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});