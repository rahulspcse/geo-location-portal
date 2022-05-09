// import Autocomplete from "react-google-autocomplete";

// export default function DistanceCheck(){
    
//     // const onPlaceSelectedHandler = (place) => {
//     // const newAddress = {
//     //   lat: place.geometry.location.lat(),
//     //   lng: place.geometry.location.lng(),
//     // };

//     // create center point; Miami
//     const center = new window.google.maps.LatLng(25.4844904, -80.4616389);

//     // user selected address
//     const to = new window.google.maps.LatLng(
//       place.geometry.location.lat(),
//       place.geometry.location.lng()
//     );

//     // now check the distance between two address, is it inside 50Miles 
//     const contains =
//       window.google.maps.geometry.spherical.computeDistanceBetween(
//         center,
//         to
//       ) <= 8046.72; // meters it's 5Miles

//    if (contains) { console.log('go ahead how can we help you') }
//    else { console.log('Sorry we do not offer our service yet') }

//   }


// return (
//  <Autocomplete
//       apiKey={'AIzaSyAQYmSiTmcx1bcOqFgmjBKP_el2cTIDkSI'}
//       className={classes.autocomplete}
//       onPlaceSelected={onPlaceSelected}
//       componentRestrictions={{ country: "us" }}
//       options={{
//         types: ["geocode", "establishment"],
//       }}
//     />
// )

// }