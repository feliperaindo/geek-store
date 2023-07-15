import { Router } from 'express';

import * as middleware from '../middleware/exporter';

import { userController } from '../controller/exporter';

const user = Router();

user.use(middleware.loginMid);

user.post('/', userController.singIn);

user.use(middleware.errorMid);

export default user;