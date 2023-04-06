import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ margin: "2rem 0" }}>Image Uploader and Viewer</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload}/>
      {imageSrc && (
        <div style={{ marginTop: "2rem" }}>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "400px" }}/>
        </div>
      )}
    </div>
  );
}
