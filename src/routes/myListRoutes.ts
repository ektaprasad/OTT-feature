import express from "express";
import { addToList, listItems, removeFromList } from "../controllers/listControls";

const router = express.Router();

router.post("/add", addToList);
router.post("/remove", removeFromList);
router.get("/:userId", listItems);

export default router;
