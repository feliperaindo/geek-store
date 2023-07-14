import { Request, Response } from 'express';

import { userService } from '../service/exporter';

async function allUsers(__request: Request, response: Response): Promise<Response> {
  const all = await userService.getAll();
  return response.status(200).send(all);
}

export default { allUsers };