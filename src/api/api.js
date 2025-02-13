import axios from "axios";

// API URL'ini sabit bir değişken olarak belirleyelim
const API_URL = "http://localhost:5000";  // Geliştirme ortamı için

// Fotoğrafları getirmek için API çağrısı
const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}/photos`); // API'den fotoğraf verisini çek
    if (response.data && response.data.length > 0) {
      return response.data;  // Fotoğraflar varsa döndür
    } else {
      console.error("No photos found.");
      return []; // Boş veri döndür
    }
  } catch (error) {
    console.error("Fotoğraf yükleme hatası: ", error.message);  // Hata mesajı
    return [];  // Hata durumunda boş veri döndür
  }
};

// Fotoğraf yükleme fonksiyonu
const uploadPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Seçilen fotoğrafı formData'ya ekle

    // Fotoğrafı API'ye gönder
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Dosya gönderirken uygun header
      },
    });

    // Yükleme başarılı ise fotoğraf URL'ini döndür
    return response.data;
  } catch (error) {
    console.error("Fotoğraf yükleme hatası: ", error.message);  // Hata mesajı
    return null;  // Hata durumunda null döndür
  }
};

export { getPhotos, uploadPhoto };
