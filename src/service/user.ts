// Types
import * as types from '../types/exporter';

// utils
import utils from '../utils/exporter';

// Model
import { userModel } from '../database/models/exporter';

async function getAll(): Promise<types.UserSequelizeModel[]> {
  return userModel.findAll();
}

async function verifyUser({ username, password }: types.Login) : Promise<types.Token> {
  const userInfo = await userModel.findOne({ where: { username } });
  
  if (userInfo === null) {
    throw new Error('Username or password invalid');
  }

  if (!await utils.bcrypt.hashValidator(password, userInfo.dataValues.password)) {
    throw new Error('Username or password invalid');
  }

  return { token: utils.tokenGenerator({ password, username }) };
}

export default { getAll, verifyUser };