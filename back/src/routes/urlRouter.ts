import express from "express";

import * as userController from "../controllers/urlController";

const router = express.Router();

router.get("/", userController.getAllUrls);
router.post("/", userController.createUrl);
router.delete("/:id", userController.deleteUrl);
router.put("/:id", userController.updateUrl);



export default router;
