import ex from 'express';
import Link from '../models/Link.js';
import auth from '../middleware/auth.middleware.js';
import config from 'config';
import shortid from 'shortid';

const { Router } = ex;

const router = Router();

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });

        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }

        res.status(404).json('Ссылка не найдена');
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
})

export default router;