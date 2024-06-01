import { Request, Response } from 'express';
import MyListModel from '../models/MyList';

export const addToList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;
  try {
    const list = await MyListModel.findOne({ userId });
    if (list) {
      if (!list.items.includes(itemId)) {
        list.items.push(itemId);
        await list.save();
      }
    } else {
      await MyListModel.create({ userId, items: [itemId] });
    }
    res.status(200).json({ message: 'Item added to list' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;
  try {
    const list = await MyListModel.findOne({ userId });
    if (list) {
      list.items = list.items.filter(item => item !== itemId);
      await list.save();
      res.status(200).json({ message: 'Item removed from list' });
    } else {
      res.status(404).json({ message: 'List not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const listItems = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    try {
        const list = await MyListModel.findOne({ userId });
        if (list) {
            const paginatedItems = list.items.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
            res.status(200).json({ items: paginatedItems });
        } else {
            res.status(404).json({ message: 'List not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
