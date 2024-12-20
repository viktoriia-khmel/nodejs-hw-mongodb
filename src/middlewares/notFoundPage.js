export const notFoundPage = (req, res) => {
  res.status(404).json({
    message: `${req.url} not found`,
  });
};
