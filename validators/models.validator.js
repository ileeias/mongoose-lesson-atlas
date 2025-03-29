import { body } from 'express-validator';
import { createCustomValidatorMiddleware } from './general.validator.js';

const fullname = body('fullname')
  .exists()
  .withMessage('поле "fullname" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!')
  .isLength({ min: 3 })
  .withMessage('Минимум 3 буквы!');
const number = body('number')
  .exists()
  .withMessage('поле "number" обязательно!')
  .isNumeric()
  .withMessage('Поле "number" должно быть Numeric!')
  .isLength({ min: 10 })
  .withMessage('Минимум 10 Цифр!');
const email = body('email')
  .exists()
  .withMessage('поле "email" обязательно!')
  .isEmail()
  .withMessage('Знак "@" обязателен!');
const address = body('address')
  .exists()
  .withMessage('поле "address" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!');
const name = body('name')
  .exists()
  .withMessage('поле "name" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!');
const description = body('description')
  .exists()
  .withMessage('поле "description" обязательно!')
  .isString()
  .withMessage('Поле имени должно быть строчкой!')
  .isLength({ min: 3 })
  .withMessage('Минимум 3 буквы!');
const price = body('price')
  .exists()
  .withMessage('поле "price" обязательно!')
  .isNumeric()
  .withMessage('Поле "number" должно быть Numeric!');
const category = body('category')
  .exists()
  .withMessage('поле "category" обязательно!');
const quantity = body('quantity')
  .exists()
  .withMessage('поле "quantity" обязательно!')
  .isNumeric()
  .withMessage('Поле "quantity" должно быть Numeric!')
  .isLength({ min: 1 })
  .withMessage('Минимум 1 шт!');
export const createUserValidator = createCustomValidatorMiddleware([
  fullname,
  number,
  email
]);
export const createProductValidator = createCustomValidatorMiddleware([
  name,
  description,
  price,
  category,
]);
export const createCategoryValidator = createCustomValidatorMiddleware([
  name,
  description
]);
export const createOrderValidator = createCustomValidatorMiddleware([
  quantity
]);
