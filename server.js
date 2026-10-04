import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets with standard cache control
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Case-insensitive / alias routing for HTML files
app.get('/sizecaliperguide.html', (req, res) => {
  if (fs.existsSync(path.join(__dirname, 'SizeCaliperGuide.html'))) {
    res.sendFile(path.join(__dirname, 'SizeCaliperGuide.html'));
  } else if (fs.existsSync(path.join(__dirname, 'sizeguide.html'))) {
    res.sendFile(path.join(__dirname, 'sizeguide.html'));
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.get('/sizecaliperguide', (req, res) => {
  res.redirect('/SizeCaliperGuide.html');
});

app.get('/sizeguide', (req, res) => {
  res.redirect('/sizeguide.html');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contactus.html'));
});

app.get('/contactus', (req, res) => {
  res.sendFile(path.join(__dirname, 'contactus.html'));
});

// Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MAKHANAM server is running on http://0.0.0.0:${PORT}`);
});
