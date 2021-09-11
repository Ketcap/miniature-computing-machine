import { NextApiRequest, NextApiResponse } from "next";
import type { NextFunction } from "./apiHandler";

export const tokenCheck = async (req: NextApiRequest,res: NextApiResponse, next?: NextFunction) => {
  const { headers } = req;
  if (!headers.authorization) {
    return res.status(401).end('Unauthorized');
  }
  await next?.();
}