import { sign, verify } from 'jsonwebtoken';
import { RequestHandler } from "express";

const secret = 'myLittleSecret';
export const create = (payload: object) => {
  return sign(payload, secret, { expiresIn: '2h' });
};

export const obtain = (jwtToken: string) => {
  let result;
  try {
    result = verify(jwtToken, secret);
  } catch {
    return { type: 'invalid', session: undefined }
  }
  return {
    type: 'valid',
    session: result
  }
}

export const continueIfJWTValid: RequestHandler = (req, res, next) => {
  const jwtAuth = req.header('Authorization');
  let jwtPayload = obtain(jwtAuth || '');
  if (jwtPayload.type !== 'valid') {
    return res.status(403).send('invalid authorization');
  }
  req.body.jwtPayload = jwtPayload;
  return next();
}
