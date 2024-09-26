import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { SelectCoverImageProps } from "../types";

export const SelectCoverImage = ({ previewImage, onChangeHandler }: SelectCoverImageProps): JSX.Element => {
  const fileInputRef = useRef<any>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const selectImageOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      // Vérifier si le fichier sélectionné est une vidéo
      if (file.type.includes("video")) {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }

      // Mise à jour de l'état avec le chemin d'accès au fichier vidéo/image
      setSelectedFile(URL.createObjectURL(file));
      // Appel à la fonction de gestion fournie par le composant parent
      onChangeHandler(e);
    }
  };


  return (
    <div onClick={selectImageOnClick} className="flex flex-col items-center cursor-pointer w-full p-2 mt-2">
      {selectedFile && isVideo ? (
        // Utiliser le chemin d'accès au fichier vidéo sélectionné
        <video controls className="rounded-md w-full h-[11.25rem] object-cover border-lightpurple border-2">
          <source src={selectedFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : selectedFile && !isVideo ? (
        // Utiliser le chemin d'accès au fichier image sélectionné
        <img src={selectedFile} alt="cover-image" className="rounded-md w-full h-[11.25rem] object-cover border-lightpurple border-2" />
      ) : (
        <div className="rounded-md border-lightpurple border-2 border-dotted p-2 w-full flex justify-center items-center">
          <BiImageAdd size={180} color="#8e65cf" />
        </div>
      )}

      <input
        type="file"
        name="profile-image"
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
