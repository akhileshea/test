import * as React from "react";
import PlaceModal from "./placesModal";

const Circle: React.FC<google.maps.CircleOptions> = (options) => {
    const [circle, setCircle] = React.useState<google.maps.Circle>();
  
    React.useEffect(() => {
      if (!circle) {
        setCircle(new google.maps.Circle());
      }
  
      // remove circle from map on unmount
      return () => {
        if (circle) {
          circle.setMap(null);
        }
      };
    }, [circle]);
  
    React.useEffect(() => {
      if (circle) {
        circle.setOptions(options);
      }
    }, [circle, options]);
  
    return null
  };

  export default Circle