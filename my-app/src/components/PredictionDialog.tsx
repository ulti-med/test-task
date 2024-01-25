import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface PredictionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const PredictionDialog: React.FC<PredictionDialogProps> = ({
  open,
  onClose,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    setIsSubmitEnabled(
      title.trim().length > 0 && description.trim().length > 0
    );
  }, [title, description]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit Prediction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the title and description for your prediction.
        </DialogContentText>
        <TextField
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          required={true}
          value={title}
          onChange={onTitleChange}
          helperText={title.trim().length === 0 ? "Title is required" : " "}
          FormHelperTextProps={{
            style: { color: "red" },
          }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          required={true}
          value={description}
          onChange={onDescriptionChange}
          helperText={
            description.trim().length === 0 ? "Description is required" : " "
          }
          FormHelperTextProps={{
            style: { color: "red" },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
