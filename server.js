import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet'
import { initDatabase } from './config/database-init.js';
import pool from './config/database.js'
import dreamsRouter from './routes/dreams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
Challenge: 

1. There is some code in this codebase which we shouldn’t deploy or push to GitHub. 
   Delete anything which is untidy, dangerous, or causes unnecessary bloat.
   hint.md for help!
*/

const app = express();

// Needed for security headers! Do not delete!
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// app.use(helmet());

const PORT = process.env.PORT || 3001;
 
// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// health endpoint
app.get('/health', async (req, res) => {
    try{
      await pool.query('SELECT 1');
      res.json({
        status: 'ok',
        db: 'connected',
        uptime: process.uptime()
      });
    } catch (error) {
      res.status(503).json({
        status: 'error',
        db: 'disconnected',
        message: error.message,
        uptime: process.uptime()
      });
    }
});

// API Routes
app.use('/api/dreams', dreamsRouter);

// Initialize database then start server
// initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

// }).catch(error => {
  // console.error('Failed to initialize database:', error);
// });
