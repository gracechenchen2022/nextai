import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // Import multer
import chat from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ 
    storage 
});

const PORT = 8080;

let filePath;
// RESTful
// GET/POST/DELETE/PATCH
// ststua code
// input paylod? param?
// output
//POST
app.get("/", (req, res) => {
    res.send("healthy");
  });

app.post("/upload", upload.single("file"), async (req, res) => {
// Use multer to handle file upload
filePath = req.file.path; // The path where the file is temporarily saved
res.send(filePath + " upload successfully.");
});
//GET
app.get("/chat", async (req, res) => {
const resp = await chat(req.query.question, filePath); // Pass the file path to your main function
res.send(resp.text);
});

app.listen(PORT, () => {
console.log(`🚀Server is running on port ${PORT}`);
});
