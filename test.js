import express from 'express';
import 'dotenv/config';

// require('dotenv').config();
// const express = require('express');
const app = express();
const port = 8001;

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode enabled 😎')
}

if (process.env.NODE_ENV !== 'production') {
    console.log('We are not in production mode 👨‍💻')
}

console.log(`Node environment: ${process.env.NODE_ENV || 'development'}`);

app.get('/', (req, res) => {
	res.send(`Node environment: ${process.env.NODE_ENV || 'development'}`);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
