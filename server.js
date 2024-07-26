const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const app = express();
const PORT = 3000;

const clientId = 'your_spotify_client_id';
const clientSecret = 'your_spotify_client_secret';

let accessToken = '';
let tokenExpiration = 0;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

async function getAccessToken() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken;
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({ grant_type: 'client_credentials' }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
                }
            }
        );
        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000; // 1 minute buffer
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Unable to fetch access token');
    }
}

app.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const token = await getAccessToken();

        const searchResponse = await axios.get(
            'https://api.spotify.com/v1/search',
            {
                params: {
                    q: query,
                    type: 'track',
                    limit: 10
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const tracks = searchResponse.data.tracks.items;
        if (tracks.length > 0) {
            const trackInfo = tracks.map(track => ({
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                thumbnail: track.album.images[0].url,
                spotifyLink: track.external_urls.spotify
            }));
            res.json(trackInfo);
        } else {
            res.json({ message: 'No tracks found' });
        }
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/introduction', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'introduction.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

app.get('/findmusic', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'findmusic.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
