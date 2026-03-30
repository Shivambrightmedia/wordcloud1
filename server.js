const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CSV_FILE = path.join(__dirname, 'data', 'messages.csv');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(CSV_FILE)) fs.writeFileSync(CSV_FILE, 'Name,Department,Message,Timestamp\n');

app.post('/api/submit', (req, res) => {
    const { name, department, message } = req.body;
    if (!name || !department || !message) return res.status(400).json({ error: 'All fields required' });
    const timestamp = new Date().toISOString();

    // Save without quotes for simplicity and compatibility with your existing data
    const cleanName = name.replace(/,/g, ' ');
    const cleanDept = department.replace(/,/g, ' ');
    const cleanMsg = message.replace(/,/g, ' ').replace(/\n/g, ' ');

    const row = `${cleanName},${cleanDept},${cleanMsg},${timestamp}\n`;

    fs.appendFile(CSV_FILE, row, (err) => {
        if (err) return res.status(500).json({ error: 'Save failed' });
        res.json({ success: true });
    });
});

app.get('/api/messages', (req, res) => {
    fs.readFile(CSV_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Read failed' });

        const lines = data.trim().split(/\r?\n/);
        const messages = lines.slice(1).map(line => {
            const parts = line.split(',');
            if (parts.length < 3) return null;

            return {
                name: parts[0].trim(),
                department: parts[1].trim(),
                text: parts[2].trim(),
                timestamp: parts[3] ? parts[3].trim() : new Date().toISOString()
            };
        }).filter(m => m !== null);

        res.json({ messages });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
