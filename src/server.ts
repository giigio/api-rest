import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./utils/AppError";
import { ZodError } from "zod/v4";

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(routes);

/**
 * 400 (Bad Request) - Erro do cliente
 * 500 (Internal Server Error) - Erro do servidor
 */

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      issues: error.issues,
    });
    return;
  }

  res.status(500).json({
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
