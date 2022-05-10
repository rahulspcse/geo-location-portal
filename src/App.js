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
import moment from "moment";

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

  const takephotoStart = () => {
    let image = camera.current.takePhoto();
    setStartImage(image);
    setFront(!front);
  }

  const takephotoEnd = () => {
    let image = camera.current.takePhoto();
    setEndImage(image);
    setFront(!front);
  }

  const [startJobDetails, setStartJobDetails]= useState(
    {
      startTime: '',
      location: '',
    }
  );

  const startJobSubmit=()=>{
    const startCurrentLocation = location;
    const newObj = {};
    newObj.location= startCurrentLocation;
    newObj.startTime= moment().format('DD-MM-YYYY h:mm:ss a');
    setStartJobDetails(newObj);
  }

  const [endJobDetails, setEndJobDetails]= useState(
    {
      endTime: '',
      location: '',
    }
  );

  const [totalTime, setTotalTime]= useState();

  const endJobSubmit=()=>{
    const endCurrentLocation = location;
    const newObj = {};
    newObj.location= endCurrentLocation;
    newObj.endTime= moment().format('DD-MM-YYYY h:mm:ss a');
    const tempObj= moment.duration(moment(newObj.endTime).diff(moment(startJobDetails.startTime)))._data;
    const temp_total= `${tempObj.hours} hours ${tempObj.minutes} minutes ${tempObj.seconds} seconds`
    setTotalTime(temp_total);
    setEndJobDetails(newObj);
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
                      <MenuItem onClick={takephotoStart}>Take Photo</MenuItem>
                      <MenuItem onClick={() => setStartImage(null)}>Cancel Photo</MenuItem>
                      <MenuItem onClick={startJobSubmit}>Submit</MenuItem>
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
                      <MenuItem onClick={takephotoEnd}>Take Photo</MenuItem>
                      <MenuItem onClick={() => setEndImage(null)}>Cancel Photo</MenuItem>
                      <MenuItem onClick={endJobSubmit}>Submit</MenuItem>
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

      <Box sx={{display: 'flex'}}>
      {
        startImage ?
        <Box sx={{my: 3, mx: 5}}>
        <h5>Start Job Photo</h5>
        <img style={{width: '300px', height: '350px'}} src={startImage} />
        </Box>
        :
        <></>
      }
      {
        endImage ?
        <Box sx={{my: 3, mx: 5}}>
           <h5>End Job Photo</h5>
           <img style={{width: '300px', height: '350px'}} src={endImage} />
        </Box>
        
        :
        <></>
      }
      </Box>

     {
       startJobDetails.location ?
       <>
       <Box sx={{m:5}}>
          <h3>Start Job:</h3>
          <h5>Lat: {location.coordinates.lat} Lan: {location.coordinates.lan}</h5>
          <h6>Start Time: {startJobDetails.startTime}</h6>
       </Box>
     
       {/* <GoogleMap
        location={startJobDetails.location.coordinates ? startJobDetails.location.coordinates : false}
      /> */}
      </>
      :
      <></>
     }

{
       endJobDetails.location ?
       <Box sx={{m: 5}}>
          <h3>End Job:</h3>
          <h5>Lat: {location.coordinates.lat} Lan: {location.coordinates.lan}</h5>
          <h6>End Time: {endJobDetails.endTime}</h6>
          <h6>Total Time: {totalTime}</h6>

       </Box>
      :
      <></>
     }
      
    </>
  );
}

export default App;
