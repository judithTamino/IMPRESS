export const validate = (schema) => async (req, _res, next) => {
  try {
    const validated = await schema.validateAsync(req.body, { abortEarly: false });
    req.body = validated;
    next();
  } catch (error) {
    next(error);
  }
};