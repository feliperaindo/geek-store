import { UserSequelizeModel } from '../database/models/user.model';

import { userModel } from '../database/models/exporter';

async function getAll(): Promise<UserSequelizeModel[]> {
  return userModel.findAll();
}

export default { getAll };