import Joi from 'joi'

export const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
  })

  return schema.validate(data)
}

export const changePasswordValidator = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Current password is required',
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'New password must be at least 6 characters',
      'any.required': 'New password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    }),
  })

  return schema.validate(data)
}

export const userRegistrationValidator = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().messages({
      'any.required': 'First name is required',
    }),
    last_name: Joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'any.required': 'Password is required',
    }),
    phone: Joi.string().optional(),
  })

  return schema.validate(data)
}
