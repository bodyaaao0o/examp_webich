const express = require('express');
const cors = require('cors');
const bookRoutes = require('./route/route.js');

const app = express();

// Використання вбудованого парсера JSON
app.use(express.json());
app.use(cors());
app.use('/', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
