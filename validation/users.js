const Joi = require('joi');

module.exports.post={
  body:{
    users: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required().min(6).regex(/^[A-Z]/),
      email: Joi.string().email(),
      phone: Joi.string().min(10).max(10).regex(/^[0-9]+$/)
    })
  }
};
