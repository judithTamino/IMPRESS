export const validate = (schema) => async (req, _res, next) => {
  // const { error } = schema.validate(req.body, { abortEarly: false });
  const validated = await schema.validateAsync(req.body, { abortEarly: false });
  req.body = validated;
  next();
};