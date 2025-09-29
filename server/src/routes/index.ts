import { Request, Response, Router } from "express";
import { ResultFunction } from "../helpers/utils";
import { ReturnStatus } from "../types/generic";
import authMiddleWare from "../middlewares/authMiddleware";
import authRouter from "./auth";
import fileRouter from "./file";

const apiRouter = Router();

// define your routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/file', fileRouter);

apiRouter.use("/hello", authMiddleWare, (req: Request, res: Response) => {
  const data = ResultFunction(
    true,
    "Welcome to url_shortener api v1.0",
    200,
    ReturnStatus.OK,
    null
  );
  return res.status(data.code).json(data);
});

export default apiRouter;
