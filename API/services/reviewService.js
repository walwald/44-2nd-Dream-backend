const reviewDao = require('../models/reviewDao');
const { BaseError } = require('../utils/error');

const createReview = async (userId, productId, content, title, url) => {
  const checkBuyed = await reviewDao.checkBuyed(userId, productId);

  if (!checkBuyed) {
    throw new BaseError('NOT_BUYER', 400);
  }

  const createReview = await reviewDao.createReview(
    userId,
    productId,
    content,
    title,
    url
  );
  return createReview;
};

const getReviewByProductId = async (productId) => {
  return await reviewDao.getReviewByProductId(productId);
};

const deleteReview = async (reviewId) => {
  return await reviewDao.deleteReview(reviewId);
};

module.exports = { createReview, getReviewByProductId, deleteReview };
