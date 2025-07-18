const Joi = require("joi");

module.exports.createPost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    position: Joi.string().allow(""),
    status: Joi.string().allow(""),
    avatar: Joi.string().allow(""),
    description: Joi.string().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}

module.exports.applyMultiPatch = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .messages({
        "string.empty": "Trạng thái áp dụng bắt buộc!",
      }),
    idList: Joi.array()
      .required()
      .messages({
        "string.empty": "Danh sách phần tử cần áp dụng bắt buộc!",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}

module.exports.trashApplyMultiPatch = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .messages({
        "string.empty": "Trạng thái áp dụng bắt buộc!",
      }),
    idList: Joi.array()
      .required()
      .messages({
        "string.empty": "Danh sách phần tử cần áp dụng bắt buộc!",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}

module.exports.editPatch = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    position: Joi.string().allow(""),
    status: Joi.string().allow(""),
    avatar: Joi.string().allow(""),
    description: Joi.string().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}

