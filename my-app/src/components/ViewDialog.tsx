import React from "react";
import { Dialog, DialogContent } from "@mui/material";

interface PredictionItem {
  label: string;
  score: number;
  box: { x: number; y: number; width: number; height: number };
}

interface PredictionsInfo {
  title: string;
  description: string;
  timestamp: Date;
  imageData: {
    items: PredictionItem[];
    imageSrc: string;
  };
}

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  prediction: PredictionsInfo | null;
}

export const ViewDialog: React.FC<ViewDialogProps> = ({
  open,
  onClose,
  prediction,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        {prediction && (
          <div>
            <img
              src={prediction.imageData.imageSrc}
              alt="Prediction"
              style={{ width: "100%", height: "auto" }}
            />
            {prediction.imageData.items.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${item.box.x}%`,
                  top: `${item.box.y}%`,
                  width: `${item.box.width}%`,
                  height: `${item.box.height}%`,
                  border: "2px solid red",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    color: "white",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "2px",
                  }}
                >
                  {item.label} ({item.score}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
