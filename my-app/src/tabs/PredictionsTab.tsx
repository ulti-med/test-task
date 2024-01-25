import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../components/ImagesTable";
import { ViewDialog } from "../components/ViewDialog";

interface PredictionItem {
  label: string;
  score: number;
  box: { x: number; y: number; width: number; height: number };
}

export interface PredictionsInfo {
  title: string;
  description: string;
  timestamp: Date;
  imageData: {
    items: PredictionItem[];
    imageSrc: string;
  };
}

const PredictionsTab: React.FC<{ predictions: PredictionsInfo[] }> = ({
  predictions,
}) => {
  const [loading, setLoading] = useState<boolean>(true); // State to manage the loading status
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPrediction, setCurrentPrediction] =
    useState<PredictionsInfo | null>(null);

  // Simulate fetching data
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleViewClick = (prediction: PredictionsInfo) => {
    setCurrentPrediction(prediction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
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
        <>
          <Paper
            sx={{
              overflow: "hidden",
              elevation: 5,
              mx: 2,
              my: 3,
              borderRadius: 2,
            }}
          >
            <TableContainer sx={{ maxHeight: 350 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Title</StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Timestamp</StyledTableCell>
                    <StyledTableCell align="center">View</StyledTableCell>
                  </TableRow>
                </TableHead>
                {predictions.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Typography variant="body1">
                          No predictions have been made yet
                        </Typography>
                        <ErrorOutlineIcon />
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
                <TableBody>
                  {predictions.map((prediction, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {prediction.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {prediction.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {prediction.timestamp.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleViewClick(prediction)}
                        >
                          VIEW
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      <ViewDialog
        open={openDialog}
        onClose={handleCloseDialog}
        prediction={currentPrediction}
      />
    </div>
  );
};

export default PredictionsTab;
