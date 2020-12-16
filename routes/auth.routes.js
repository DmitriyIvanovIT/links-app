import ex from 'express';
import User from '../models/User.js';
import bcript from 'bcryptjs';
import ex_valid from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';

const { Router } = ex;

const { check, validationResult } = ex_valid;

const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при регистрации'
                })
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "Такой пользователь существует" });
            }

            const hashedPassword = await bcript.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'Пользователь создан' });

        } catch (err) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при авторизации'
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "Такого пользователя не существует" });
            }

            const isMatch = await bcript.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный пароль, попробуйде снова" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });
        } catch (err) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
});

export default router;