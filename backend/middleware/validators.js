const Joi = require('joi');

exports.validateFeedback = (data) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(10).max(1000).required(),
    images: Joi.array().items(Joi.string().uri())
  });

  return schema.validate(data);
};

exports.validateResponse = (data) => {
  const schema = Joi.object({
    response: Joi.string().min(10).max(1000).required()
  });

  return schema.validate(data);
}; 