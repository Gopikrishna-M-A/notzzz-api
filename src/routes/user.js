import express from 'express';
const router = express.Router();
import { getUser, getAllUsers, getUserByEmail, addUser, deleteUser, updateUser, getAllCreators, getInfo, addRating, addDownloads }  from '../controllers/user.js';


router.get("/:id", getUser)
router.get("/email/:id", getUserByEmail)
router.get("/",getAllUsers)
router.get("/creators",getAllCreators)
router.post("/", addUser)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)

router.get("/info/:userId", getInfo)

router.post("/:userId/ratings", addRating)

router.post("/:userId/downloads", addDownloads)

export default router;
