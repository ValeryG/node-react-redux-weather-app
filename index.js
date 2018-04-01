const express = require('express');
const app = express();
const weatherRoutes = require('./app/routes/Weather');

const port = process.env['PORT'] || 3000;

app.use(express.static('dist'));
app.use('/api/v1/weather', weatherRoutes);

app.listen(port, () => { console.log(`Started and listening on port ${port}`); });
