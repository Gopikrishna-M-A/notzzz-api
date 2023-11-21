import express from 'express';
import multer from 'multer'
const router = express.Router();
import { getModule, addModule, getAllModules, getModuleBysubjectId, deleteModule, updateModule, getPdf }  from '../controllers/module.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
      console.log("uploadPath", uploadPath);
      cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


router.get("/:id", getModule)
router.get("/",getAllModules)
router.get("/sub/:id",getModuleBysubjectId)
router.post("/", upload.single('pdf'), addModule)
router.delete("/:id", deleteModule)
router.patch("/:id", updateModule)
router.get("/getPdf/:path", getPdf)



export default router;
