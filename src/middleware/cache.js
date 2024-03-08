import client from "../redis/redis.js";

export const cache = async (
  req,
  res,
  next
) => {
  const cache = await client.get(req.originalUrl);
  if (!cache) {
     return next();
  }
  res.status(200).send(JSON.parse(cache));
};