const userService = require('../services/userService');
const { catchAsync, BaseError } = require('../utils/error');

const signInKakao = catchAsync(async (req, res) => {
  const { kakaoToken } = req.body;

  if (!kakaoToken) throw new BaseError(401, 'NEED_KAKAOTOKEN');

  const { accessToken, name } = await userService.signInKakao(kakaoToken);

  return res.status(200).json({ token: accessToken, nickname: name });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userInfo = await userService.getUserById(userId);

  return res.status(200).json(userInfo);
});

const inputAddress = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address, detail_address, receiver } = req.body;

  if (!address || !detail_address || !receiver) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const addressId = await userService.inputAddress(
    userId,
    address,
    detail_address,
    receiver
  );

  return res.status(201).json({ addressId: addressId });
});

const addressByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const addresses = await userService.addressByUserId(userId);
  return res.status(200).json(addresses);
});

const inputNewAccount = catchAsync(async (req, res) => {
  const { accountNumber } = req.body;

  if (!accountNumber) throw new BaseError('KEY_ERROR', 400);

  const userId = req.user.id;
  const newAccountId = await userService.inputNewCard(accountNumber, userId);
  return res.status(201).json({ accountId: newAccountId });
});

const inputNewCard = catchAsync(async (req, res) => {
  const { cardNumber } = req.body;

  if (!cardNumber) throw new BaseError('KEY_ERROR', 400);

  const userId = req.user.id;
  const newCardId = await userService.inputNewCard(cardNumber, userId);
  return res.status(201).json({ cardId: newCardId });
});

const getAccountListByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const accountList = await userService.getAccountListByUser(userId);
  return res.status(200).json(accountList);
});

const getCardListByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cardList = await userService.getCardListByUser(userId);
  return res.status(200).json(cardList);
});

module.exports = {
  signInKakao,
  getUserById,
  inputNewAccount,
  inputNewCard,
  getAccountListByUser,
  getCardListByUser,
  addressByUserId,
  inputAddress,
};
