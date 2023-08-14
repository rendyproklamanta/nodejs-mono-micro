const express = require('express');
const router = express.Router();
const {
   login,
   logout,
   verifyEmailAddress,
   forgetPassword,
   changePassword,
   resetPassword,
   tokenData,
} = require('@services/auths/controllers/auth.controller');

const { passwordVerificationLimit, emailVerificationLimit } = require('@config/others');
const { isAuth } = require('@services/auths/middlewares/auth.middleware');
const { authCreateSchema } = require('@services/auths/middlewares/auth.validator');
const { validate } = require('@config/validate');

const ENDPOINT = '/api/auths';

//root route
router.get(`${ENDPOINT}`, (req, res) => {
   res.status(200).send('Auth Service is Running!');
});

//verify email
router.post(`${ENDPOINT}/verify-email`, emailVerificationLimit, verifyEmailAddress);

//login a user
router.post(`${ENDPOINT}/login`, validate(authCreateSchema), login);

//logout a user
router.get(`${ENDPOINT}/logout`, logout);

//forget-password
router.put(`${ENDPOINT}/forget-password`, passwordVerificationLimit, forgetPassword);

//reset-password
router.put(`${ENDPOINT}/reset-password`, resetPassword);

//change password
router.post(`${ENDPOINT}/change-password`, changePassword);

//get
router.get(`${ENDPOINT}/checktoken`,
   isAuth, // middleware
);

//get
router.get(`${ENDPOINT}/tokendata`,
   isAuth, // middleware
   tokenData,
);

module.exports = router;
