// middlewares/validationSchemas.js
import Joi from 'joi';

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'Passwords must match' }),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


export const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

