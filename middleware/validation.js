import { celebrate, Joi } from "celebrate";

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    username: Joi.string().min(2).max(30).required(),
  }),
});

export const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

export const validateAuth = celebrate({
  headers: Joi.object({
    authorization: Joi.string()
      .pattern(/^Bearer\s.+$/)
      .required(),
  }).unknown(true),
});
