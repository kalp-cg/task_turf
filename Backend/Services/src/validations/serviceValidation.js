const Joi = require('joi');

const createServiceSchema = Joi.object({
  category: Joi.string()
    .valid('Home Maintenance', 'Cleaning', 'Personal Care', 'Professional', 'Technical')
    .required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  provider: Joi.string().required(),
  availability: Joi.boolean()
});

module.exports = {
  createServiceSchema
};