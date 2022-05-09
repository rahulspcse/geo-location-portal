import GoogleMap from "./Components/GoogleMap/GoogleMap";
import useGeoLocation from "./Components/useGeoLocation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useEffect, useRef, useState } from "react";
import {Camera} from "react-camera-pro";

function App() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [open1, setOpen1] = useState(false);
  const anchorRef1 = useRef(null);

  const handleToggle1 = () => {
    setOpen1((prevOpen) => !prevOpen);
  };

  const location = useGeoLocation();
  const [value, setValue] = useState({
    lat: 22.3388336,
    lng: 91.843361,
    distance: 500,
  });
  const [difference, setDifference] = useState("");

  const [result, setResult] = useState();

  useEffect(() => {
    if (location.loaded && location.coordinates) {
      const center = new window.google.maps.LatLng(value.lat, value.lng);

      const to = new window.google.maps.LatLng(
        location.coordinates.lat,
        location.coordinates.lan
      );
      const contains =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        ) <= value.distance;

      const actualDifference =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          center,
          to
        );

      setDifference(actualDifference);

      if (contains) {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  }, [location]);

  const camera = useRef(null);
  const [startImage, setStartImage] = useState(null);
  const [endImage, setEndImage]= useState(null);
  const [front, setFront] = useState(false);

  const takephoto = () => {
    let image = camera.current.takePhoto();
    console.log(image);
    startImage(image);
  }

  const toggleFront = () => {
    let image = camera.current.takePhoto();
    console.log(image);
    startImage(image);
    setFront(!front);
  }


  return (
    <>
      <Box sx={{ mx: "auto", mt: 4, width: 300 }}>
        <h3>
          Output: {result} {difference}
        </h3>
      </Box>


      {result ? (
        <Box sx={{ width: 400, height: 200, mx: "auto" }}>
          <Button
          sx={{mx: 5}}
            variant="contained"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Start Job
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem onClick={takephoto}>Take Photo</MenuItem>
                      <MenuItem onClick={toggleFront}>Cancel Photo</MenuItem>
                      <MenuItem>Submit</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <Button
            variant="contained"
            ref={anchorRef1}
            id="composition-button1"
            aria-controls={open1 ? "composition-menu" : undefined}
            aria-expanded={open1 ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle1}
          >
            End Job
          </Button>
          <Popper
            open={open1}
            anchorEl={anchorRef1.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={() => setOpen1(false)}>
                    <MenuList
                      autoFocusItem={open1}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      {/* <MenuItem onClick={()=> setEndImage(camera.current.takePhoto())}>Take Photo</MenuItem>
                      <MenuItem onClick={() => setEndImage(null)}>Cancel Photo</MenuItem> */}
                      <MenuItem>Submit</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      ) : (
        <></>
      )}

      <Camera aspectRatio='cover' ref={camera} facingMode={front ? {exact: 'environment'} : {exact: 'user'} } />
      {
        startImage ?
        <img style={{width: '300px', height: '250px', margin: '50px'}} src={startImage} />
        :
        <></>
      }
      {
        endImage ?
        <img style={{width: '300px', height: '250px'}} src={endImage} />
        :
        <></>
      }
     
    

      <GoogleMap
        centerLat={value.lat}
        centerLng={value.lng}
        location={location.coordinates ? location.coordinates : false}
      />
    </>
  );
}

export default App;
