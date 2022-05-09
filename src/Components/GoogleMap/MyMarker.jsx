import React from "react";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './MyMarker.css';

const MyMarker = ({ text, tooltip, $hover, lat, lng }) => {
  
const [open, setOpen] = React.useState(false);

const handleTooltipClose = () => {
    setOpen(false);
};

const handleTooltipOpen = () => {
    setOpen(true);
};

// //  create center point; Miami
//  const center = new window.google.maps.LatLng(22.325141, 91.811104);

 

//  // user selected address
//  const to = new window.google.maps.LatLng(
//    lat,
//    lng
//  );


// const contains =
//       window.google.maps.geometry.spherical.computeDistanceBetween(
//         center,
//         to
//       ); 

// console.log(contains);

  return (
    <div className={$hover ? "circle hover" : "circle"} >
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                componentsProps={{
                    tooltip: {
                      sx: {
                        width: 200,
                        p: 2,
                        bgcolor: 'white',
                        '& .MuiTooltip-arrow': {
                          color: 'white',
                          fontSize: 17
                        },
                        color: 'black'
                      },
                    },
                  }}
                title={<Typography fontSize={12}>{tooltip}</Typography>}
                arrow
              >
                <span onClick={handleTooltipOpen} className="circleText" >
                    {text}
                </span>
              </Tooltip>
              </ClickAwayListener> 
    </div>
  );
};

export default MyMarker;
