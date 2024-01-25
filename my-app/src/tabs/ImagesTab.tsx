import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import ImagesTable from "../components/ImagesTable";
import { PredictionsInfo } from "../tabs/PredictionsTab"; // Import the type

export interface ImagesTabProps {
  predictions: PredictionsInfo[];
  setPredictions: React.Dispatch<React.SetStateAction<PredictionsInfo[]>>;
  images: ImageInfo[];
  setImages: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
}

export interface ImageInfo {
  filename: string;
  size: number;
  src: string;
  timeOfUpload: string;
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const ImagesTab: React.FC<ImagesTabProps> = ({
  predictions,
  setPredictions,
  images,
  setImages,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching data
  React.useEffect(() => {
    // Simulate a fetch call with a timeout
    setTimeout(() => {
      // After fetching data, set loading to false
      setLoading(false);
    }, 2000);
  }, []);

  const handleFileUpload = (selectedFile: File) => {
    if (selectedFile) {
      const newImage = {
        filename: selectedFile.name,
        size: selectedFile.size,
        src: URL.createObjectURL(selectedFile),
        timeOfUpload: formatDate(new Date()),
      };
      setImages([...images, newImage]);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <FileUpload handleFileUpload={handleFileUpload} />
          <ImagesTable
            images={images}
            predictions={predictions}
            setPredictions={setPredictions}
          />
        </div>
      )}
    </>
  );
};

export default ImagesTab;
