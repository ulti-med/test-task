import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";
import { ImageInfo } from "../tabs/ImagesTab";
import { PredictionsInfo } from "../tabs/PredictionsTab";
import { PredictionDialog } from "./PredictionDialog";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ImagesTableProps {
  images: ImageInfo[];
  predictions: PredictionsInfo[]; // Add this line
  setPredictions: React.Dispatch<React.SetStateAction<PredictionsInfo[]>>; // And this line
}

export const ImagesTable: React.FC<ImagesTableProps> = ({
  images,
  predictions,
  setPredictions,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [previewedImage, setPreviewedImage] = useState<ImageInfo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageClick = (image: ImageInfo) => {
    setPreviewedImage(image);
    setOpenImageDialog(true);
  };
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setPreviewedImage(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDialog = () => {
    setTitle("");
    setDescription("");
    setOpenDialog(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (currentImage && title && description) {
      const newPrediction = {
        title: title,
        description: description,
        timestamp: new Date(),
        imageData: {
          items: [],
          imageSrc: currentImage.src,
        },
      };

      setPredictions([...predictions, newPrediction]); // Update predictions

      handleCloseDialog();
    }
  };

  const handlePredictClick = (image: ImageInfo) => {
    setCurrentImage(image);
    setOpenDialog(true);
  };

  return (
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
                <StyledTableCell align="center">Filename</StyledTableCell>
                <StyledTableCell align="center">Size (KB)</StyledTableCell>
                <StyledTableCell align="center">Time of Upload</StyledTableCell>
                <StyledTableCell align="center">Predict</StyledTableCell>
              </TableRow>
            </TableHead>
            {images.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Typography variant="body1">
                      No images have been uploaded yet
                    </Typography>
                    <ErrorOutlineIcon />
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            )}
            <TableBody>
              {images
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((image, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <Button
                        onClick={() => handleImageClick(image)}
                        aria-label="View Image"
                      >
                        {image.filename}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {(image.size / 1024).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {image.timeOfUpload.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePredictClick(image)}
                        aria-label="Predict Button"
                      >
                        PREDICT
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={images.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        sx={{ borderRadius: 2 }}
      >
        <DialogContent>
          {previewedImage && (
            <div>
              <img
                src={previewedImage.src}
                alt={previewedImage.filename}
                style={{ maxWidth: "100%", maxHeight: "90vh" }} // Adjust styling as needed
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <PredictionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={title}
        description={description}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ImagesTable;
