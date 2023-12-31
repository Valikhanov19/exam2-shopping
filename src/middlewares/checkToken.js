import jwt from '../utils/jwt.js'

export default (req, res, next) => {
  try {
    const { token } = req.headers
    if(!token){
      throw new Error('token required')
    }
    const { username } = jwt.verify(token);
    req.username = username;
    next()
  } catch (error) {
    return next(error)
  }
}