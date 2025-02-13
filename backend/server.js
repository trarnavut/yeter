import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

// Ortam değişkenlerini yükle
dotenv.config();

// Express uygulamasını başlat
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware'ler
app.use(cors());
app.use(express.json());

// Supabase bağlantısı
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Multer ile dosya yükleme ayarları
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Fotoğraf yükleme endpoint'i
app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Supabase'e yükleme
    const { data, error } = await supabase.storage
      .from("photos")
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) throw error;

    res.json({ message: "Fotoğraf yüklendi!", url: data.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Fotoğrafları listeleme endpoint'i
app.get("/photos", async (req, res) => {
  try {
    const { data, error } = await supabase.storage.from("photos").list();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});
