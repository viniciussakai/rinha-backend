import { Router } from "express";
import { peopleController } from "./controllers/peopleController";

const router = Router();

router.get("/pessoas/:id", peopleController.findOne);
router.get("/pessoas", peopleController.searchTerm);
router.post("/pessoas", peopleController.create);
router.get("/contagem-pessoas", peopleController.count);

export { router as routes };
