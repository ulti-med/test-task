import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImagesTab, { ImageInfo } from "./tabs/ImagesTab";
import PredictionsTab, { PredictionsInfo } from "./tabs/PredictionsTab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = () => {
  const [value, setValue] = useState(0);
  const [predictions, setPredictions] = useState<PredictionsInfo[]>([]);
  const [images, setImages] = useState<ImageInfo[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#007aff",
      },
      error: {
        main: "#D83F48",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navigation tabs example"
            centered
            indicatorColor="primary"
          >
            <Tab label="Images" component={Link} to="/" />
            <Tab label="Predictions" component={Link} to="/prediction" />
          </Tabs>
          <Routes>
            <Route
              path="/"
              element={
                <ImagesTab
                  images={images}
                  setImages={setImages}
                  predictions={predictions}
                  setPredictions={setPredictions}
                />
              }
            />
            <Route
              path="/prediction"
              element={<PredictionsTab predictions={predictions} />}
            />
          </Routes>

          {/* <Routes>
            <Route path="/" element={<ImagesTab />} />
            <Route
              path="/prediction"
              element={<PredictionsTab predictions={[]} />}
            />
          </Routes> */}
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
