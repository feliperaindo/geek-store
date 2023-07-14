import { Response, Request } from 'express';

function rootRoute(__request: Request, response: Response): Response {
  return response.status(200).send('Aplicação está rodando');
}

export default rootRoute;