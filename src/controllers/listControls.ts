import { Request, Response } from "express";
import myListService from "../services/myListService";

export const addToMyList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  try {
    await myListService.addToMyList(userId, itemId);
    res.status(200).json({ message: "Item added to list" });
  } catch (error) {
    res.status(500).json({ error: "Error adding item to list" });
  }
};

export const removeFromMyList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  try {
    await myListService.removeFromMyList(userId, itemId);
    res.status(200).json({ message: "Item removed from list" });
  } catch (error) {
    res.status(500).json({ error: "Error removing item from list" });
  }
};

export const listMyItems = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    const items = await myListService.listMyItems(userId, page, limit);
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ error: "Error listing items" });
  }
};
