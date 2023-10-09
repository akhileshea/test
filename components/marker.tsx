import * as React from "react";
import PlaceModal from "./placesModal";

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    const [modalOpen,setModalOpen] = React.useState(false)
  
    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
      else {
        marker.addListener("click", () => {
          console.log(options.attraction)
          setModalOpen(true)
         });
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
  
    return (
        <>
            <PlaceModal placeResult={options.attraction} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    )
  };

  export default Marker