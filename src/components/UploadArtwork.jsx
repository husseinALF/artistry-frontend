import { useState } from "react";
import "./UploadArtwork.css";

const UploadArtwork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kontrollera filstorlek (max 10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({
          text: "Filen är för stor. Välj en bild som är mindre än 10 MB.",
          type: "error",
        });
        e.target.value = null; // Återställ fil-inputen
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setMessage({ text: "Titel och bild krävs!", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({
          text: "Du måste vara inloggad för att ladda upp konstverk",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // Logga data för felsökning
      console.log(
        "Sending to:",
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/gallery/`
      );
      console.log("Token:", token);
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Image:", image);
      console.log("Image type:", image.type);
      console.log("Image size:", image.size);

      // Kontrollera att bildfilen har rätt format
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (!validImageTypes.includes(image.type)) {
        setMessage({
          text: `Felaktigt bildformat: ${image.type}. Tillåtna format är JPEG, PNG och GIF.`,
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // Förenklad fetch utan onödiga headers
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/gallery/`,
        {
          method: "POST",
          // Låt browsern själv hantera Content-Type för FormData
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          // Inkludera credentials för att skicka cookies om det behövs
          credentials: "include",
        }
      );

      // Kontrollera om svaret är OK innan vi försöker tolka JSON
      if (response.ok) {
        // Ta emot och använda data
        const data = await response.json();
        console.log("Svar från server:", data);

        setMessage({ text: "Konstverket har laddats upp!", type: "success" });
        setTitle("");
        setDescription("");
        setImage(null);
        setPreview("");
      } else {
        // Hantera olika typer av fel baserat på statuskoden
        if (response.status === 401) {
          setMessage({
            text: "Du är inte längre inloggad. Logga in igen.",
            type: "error",
          });
        } else if (response.status === 413) {
          setMessage({
            text: "Bilden är för stor. Välj en mindre bild.",
            type: "error",
          });
        } else if (response.status === 422) {
          try {
            const errorData = await response.json();
            console.log("422 Error details:", errorData);
            setMessage({
              text:
                errorData.message ||
                errorData.msg ||
                "Bilden kunde inte bearbetas. Försök med en annan bildformat.",
              type: "error",
            });
          } catch (jsonError) {
            console.error("Kunde inte tolka JSON-svar för 422-fel:", jsonError);
            setMessage({
              text: "Bilden kunde inte bearbetas. Försök med en annan bildformat.",
              type: "error",
            });
          }
        } else {
          try {
            const errorData = await response.json();
            setMessage({
              text:
                errorData.message ||
                errorData.msg ||
                "Något gick fel, försök igen",
              type: "error",
            });
          } catch (error) {
            // Fånga fel vid JSON-tolkning
            console.error("Kunde inte tolka JSON-svar:", error);
            setMessage({
              text: `Serverfel (${response.status}): ${response.statusText}`,
              type: "error",
            });
          }
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        text: `Serverfel: ${error.message || "Okänt fel, försök igen senare"}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-artwork">
      <h2>Ladda upp konstverk</h2>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titel *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Beskrivning</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">
            Bild * <span className="file-size-limit">(Max 10 MB)</span>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Förhandsgranskning" />
            </div>
          )}
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Laddar upp..." : "Ladda upp konstverk"}
        </button>
      </form>
    </div>
  );
};

export default UploadArtwork;
