const searchDao = require('../models/searchDao');
const { BaseError } = require('../utils/error');

const search = async (limit, offset, keyword) => {
  await searchDao.inputSearchKeyword(keyword);
  return await searchDao.search(limit, offset, keyword);
};

const getHotTopics = async () => {
  return searchDao.getHotTopics();
};

module.exports = {
  search,
  getHotTopics,
};
