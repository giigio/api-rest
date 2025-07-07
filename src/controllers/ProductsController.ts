import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import * as z from "zod/v4";

class ProductsController {
  /**
   * index - GET listar vários registros
   * show - GET listar um único registro
   * create - POST criar um registro
   * update - PUT atualizar um registro
   * remove - DELETE remover um registro
   */

  index(req: Request, res: Response) {
    const { page, limit } = req.query;

    res.send(`Produtos - Página: ${page}, Limite: ${limit}`);
  }

  create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string({
          error: (iss) =>
            iss.input === undefined ? "Name is required." : "Invalid input.",
        })
        .trim()
        .min(6, "Name must be at least 6 characters long"),
      price: z
        .number({
          error: (iss) =>
            iss.input === undefined ? "Price is required." : "Invalid input.",
        })
        .positive("Price must be a positive number"),
    });

    const { name, price } = bodySchema.parse(req.body);

    res.status(201).json({ name, price, user_id: req.user_id });
  }
}

export { ProductsController };
