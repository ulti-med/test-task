import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";

type YourInputComponentProps = {
  handleFileUpload: (selectedFile: File) => void;
};

export const FileUpload: React.FC<YourInputComponentProps> = ({
  handleFileUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const uploadFile = () => {
    if (!selectedFile) return;
    handleFileUpload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <Stack gap={2} sx={{ pl: 3, maxWidth: 250 }}>
      <input
        accept="image/*"
        type="file"
        onChange={handleFileChoice}
        style={{
          paddingTop: 25,
          overflow: "hidden",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={uploadFile}
        disabled={!selectedFile}
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
      </Button>
    </Stack>
  );
};
