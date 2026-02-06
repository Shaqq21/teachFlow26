const express = require('express');
const cors = require('cors');
const { getDatabase, getOne, getAll, runQuery } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database before starting server
async function startServer() {
    await getDatabase();

    // Import routes after database is ready
    const lessonsRouter = require('./routes/lessons');
    const assignmentsRouter = require('./routes/assignments');
    const classesRouter = require('./routes/classes');
    const authRouter = require('./routes/auth');
    const dashboardRouter = require('./routes/dashboard');
    const notificationsRouter = require('./routes/notifications');
    const { ensureSheetHeaders } = require('./utils/googleSheets');

    // Initialize Google Sheets headers
    await ensureSheetHeaders();

    // API Routes
    app.use('/api/auth', authRouter);
    app.use('/api/lessons', lessonsRouter);
    app.use('/api/assignments', assignmentsRouter);
    app.use('/api/classes', classesRouter);
    app.use('/api/dashboard', dashboardRouter);
    app.use('/api/notifications', notificationsRouter);

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`
  ╔════════════════════════════════════════╗
  ║     TeachFlow API Server v1.0          ║
  ╠════════════════════════════════════════╣
  ║  🚀 Server running on port ${PORT}         ║
  ║  📚 API: http://localhost:${PORT}/api     ║
  ╚════════════════════════════════════════╝
    `);
    });
}

startServer().catch(console.error);

module.exports = app;
