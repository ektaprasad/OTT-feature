import express from "express";
import { addToMyList, listMyItems, removeFromMyList } from "../controllers/listControls";

const router = express.Router();

router.post("/add", addToMyList);
router.post("/remove", removeFromMyList);
router.get("/:userId", listMyItems);

export default router;
