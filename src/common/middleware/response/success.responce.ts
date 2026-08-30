import { Response } from "express";
export const successResponce = ({
  res,
  data,
  message,
  status,
}: {
  res: Response;
  data: any;
  message: any;
  status: number;
}) => {
  res.status(status).json({ message, data });
};
