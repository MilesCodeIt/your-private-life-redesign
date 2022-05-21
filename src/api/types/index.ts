import type { Request, Response } from "express";

export interface ApiSuccess<R> {
  success: true;
  data: R;
}

export interface ApiError {
  success: false;
  message: string;
  debug?: unknown;
}

export type ApiRoute<B, R> = (
  req: Request<{}, {}, B>,
  res: Response<ApiSuccess<R> | ApiError>
) => Promise<void> | void;
