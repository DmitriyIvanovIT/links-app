import ex from 'express';
import config from 'config';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import linkRoutes from './routes/link.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import * as path from 'path';

const app = ex();

app.use(ex.json({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);
app.use('/t', redirectRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', ex.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('PORT') || 3000;

const DB = config.get('URL_DB');

const start = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
    } catch (err) {
        console.log('Server Error', err.message);
        process.exit(1);
    }
}



start();