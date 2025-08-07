import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js'


//update User
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));

  try {

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, { new: true })

    // if (!updateUser) {
    //   return next(errorHandler(404, 'User not found!'));
    // }

    const { password, ...rest } = updateUser._doc;
    return res.status(200).json(rest);

  } catch (error) {
    next(error)
  }
}


//delete User
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
}