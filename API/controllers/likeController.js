const likeService = require('../services/likeService');
const { catchAsync } = require('../utils/error');

const isLike = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const { proudctId } = req.params;

  const like = await likeService.isLike(proudctId, userId);

  if (like) return res.status(201).json({ message: 'CREATE_LIKE' });

  return res.status(204).json();
});

module.exports = {
  isLike,
};
