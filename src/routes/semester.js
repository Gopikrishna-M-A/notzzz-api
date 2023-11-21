import express from 'express';
const router = express.Router();
import { getSemester, getAllSemesters, addSemester, deleteSemester, updateSemester }  from '../controllers/semester.js';


router.get("/:id", getSemester)
router.get("/",getAllSemesters)
router.post("/", addSemester)
router.delete("/:id", deleteSemester)
router.patch("/:id", updateSemester)


export default router;
