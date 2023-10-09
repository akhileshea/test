import * as React from "react";
import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./map";
import Circle from "./circle";
import Marker from "./marker";
import LocationSearchInput from "./autocomplete";
import SearchRadiusSlider from "./radiusSlider";
import { getFirestore,collection, addDoc  } from "firebase/firestore";
import app from "../config.js"


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const SearchDestination: React.VFC = () => {
  const [zoom, setZoom] = React.useState(13); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 51.5,
    lng: 0,
  });
  const [destCenter, setDestCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 51.5,
    lng: 0,
  });
  const [radius, setRadius] = React.useState(1);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [address, setAddress] = React.useState('');
  const [attractions,setAttractions] = React.useState<google.maps.places.PlaceResult[]>([])
  const db = getFirestore(app);

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const setLatlangOfDest = (latLang: google.maps.LatLngLiteral ) => {
    setCenter(latLang);
    setDestCenter(latLang);
  }

  const fetchAttractions = () => {
    console.log(radius)
    const request = {
      type: ['tourist_attraction'],
      radius: radius*1000,
      location: destCenter
    };

    const service = new google.maps.places.PlacesService(map);
    let attractions = [];
    
    service.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          attractions = attractions.concat(results);
        if(pagination && pagination.hasNextPage) {
            console.log('There is a next page');
            pagination.nextPage()
        }
        else {
          setAttractions(attractions);
          console.log(attractions);
        }
      }
    });
  }

  function handleSliderChange(radius: number): void {
    fetchAttractions();
    setRadius(radius);
  }

  return (
    
    <>
    {console.log('rerender')}
      <div>
            <LocationSearchInput setLatlang={setLatlangOfDest} address= {address} setAddress= {setAddress} fetchAttractions= {fetchAttractions}/>
      </div>
      <div>
      <SearchRadiusSlider radius={radius} setRadius={handleSliderChange}/>
    </div>
      <div style={{ display: "flex", height: "80%", width: "90%", margin: "20px auto" }}>
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} render={render}>
            <Map
              center={center}
              onClick={onClick}
              onIdle={onIdle}
              zoom={zoom}
              style={{ flexGrow: "1", height: "100%" }}
              map = {map}
              setMap = {setMap}
            >
              {attractions.map((attraction, i) => (
                <Marker key={attraction.reference} position={attraction.geometry.location} attraction={attraction} />
              ))}
              {
                address !='' && 
                <Circle
                center={destCenter}
                radius={radius*1000}
                fillColor={"#94A5D4"}
                strokeOpacity={0.8}
                strokeWeight={2}
                strokeColor={"#505E85"}
                fillOpacity={0.35}/>
               }
            </Map>
        </Wrapper>
      </div>
    </>
  );
};

export default SearchDestination;
