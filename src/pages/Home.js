import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Supabase client importu
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // home.css dosyasını import ettik

const Home = () => {
  const [photos, setPhotos] = useState([]); // Fotoğrafları saklamak için state
  const [file, setFile] = useState(null); // Seçilen dosyayı saklamak için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu için state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      const { data, error } = await supabase.storage.from('photos').list();
      if (error) {
        console.error("Fotoğraflar alınamadı:", error.message);
      } else {
        setPhotos(data);  // Fotoğrafları güncelle
      }

      setLoading(false); // Yükleniyor durumunu false yap
    };

    fetchPhotos();
  }, []);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]); // Seçilen dosyayı state'e ekle
  };

  const handleFileUpload = async () => {
    if (!file) return;

    // Fotoğrafın ismini almak ve Supabase'e yüklemek
    const { data, error } = await supabase.storage.from('photos').upload(file.name, file, {
      cacheControl: '3600', // İsteğe bağlı olarak, cacheControl belirleyebilirsiniz
      upsert: true // Dosya zaten varsa üzerine yazılır
    });

    if (error) {
      console.error("Fotoğraf yüklenirken hata oluştu:", error.message);
      return;
    }

    console.log("Fotoğraf başarıyla yüklendi:", data);

    // Fotoğraf yüklendikten sonra fotoğrafları tekrar al
    const { data: updatedPhotos, error: fetchError } = await supabase.storage.from('photos').list();
    if (fetchError) {
      console.error("Fotoğraflar alınamadı:", fetchError.message);
      return;
    }
    setPhotos(updatedPhotos); // Yeni fotoğrafları güncelle
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // Çıkış yaptıktan sonra login sayfasına yönlendir
  };

  const handleDelete = async (photoName) => {
    const { error } = await supabase.storage.from('photos').remove([photoName]);

    if (error) {
      console.error("Fotoğraf silinirken hata oluştu:", error.message);
    } else {
      // Silme işlemi başarılıysa fotoğrafları tekrar al
      setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.name !== photoName)); // Silinen fotoğrafı listeden çıkar
      console.log("Fotoğraf başarıyla silindi");
    }
  };

  return (
    <div>
      <h2>Fotoğraf Albümü</h2>

      {loading ? (
        <p>Yükleniyor...</p> // Yükleniyor mesajını sadece loading true ise göster
      ) : (
        <>
          {/* Dosya seçme inputu */}
          <input 
             type="file" 
             onChange={handleFileSelect} 
             className="file-input"
            />
          
          <button onClick={handleFileUpload} className="upload-btn">Fotoğraf Yükle</button>

            <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>

          {/* Fotoğrafları göster */}
          {photos.length === 0 ? (
            <p>Fotoğraf yok.</p>
          ) : (
            <div className="photo-gallery">
              {photos.map((photo, index) => {
                const imageUrl = `https://rushqtzamcqrxzbzaixy.supabase.co/storage/v1/object/public/photos/${photo.name}`;
                return (
                  <div key={index} className="photo-item">
                    <img
                      src={imageUrl}
                      alt={`Uploaded ${index}`}
                    />
                    <button 
                      onClick={() => handleDelete(photo.name)} 
                      className="delete-button"
                    >
                      Sil
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
