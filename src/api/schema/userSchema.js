import Joi from 'joi';

export var userRegisterSchema = Joi
  .object()
  .keys({
    email: Joi.string().lowercase().email().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
  });

export var resetPasswordSchema = Joi
  .object()
  .keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
  });

export var forgotPasswordSchema = Joi
  .object()
  .keys({
    email: Joi.string().lowercase().email().required()
  });

export var forgotPasswordResponseSchema = Joi
  .object()
  .keys({
    resetTokenValidity: Joi.date().required()
  });

export var changePasswordWithTokenSchema = Joi
  .object()
  .keys({
    resetToken: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  });

export var changePasswordAsAdminSchema = Joi
  .object()
  .keys({
    newPassword: Joi.string().min(6).required()
  });

export var setActiveAsAdminSchema = Joi
  .object()
  .keys({
    isActive: Joi.boolean().required()
  });
