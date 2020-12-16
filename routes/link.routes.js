import ex from 'express';
import Link from '../models/Link.js';
import auth from '../middleware/auth.middleware.js';
import config from 'config';
import shortid from 'shortid';

const { Router } = ex;

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if (existing) {
            return res.json({ link: existing });
        }

        const to = `${baseUrl}/t/${code}`;

        const link = new Link ({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });

    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id);
        
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

export default router;