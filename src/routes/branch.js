import express from 'express';
const router = express.Router();
import { getBranch, getAllBranch, addBranch, deleteBranch, updateBranch }  from '../controllers/branch.js';


router.get("/:id", getBranch)
router.get("/",getAllBranch)
router.post("/", addBranch)
router.delete("/:id", deleteBranch)
router.patch("/:id", updateBranch)




export default router;
