import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface AutoCompleteProps {
  setLatlang: (latLang: google.maps.LatLngLiteral) => void;
  address: String;
  setAddress: (address: String) => void;
  fetchAttractions: () => void;
}
const LocationSearchInput: React.FC<AutoCompleteProps> = ({ setLatlang, address, setAddress, fetchAttractions }) => {

  

  const handleChange = address => {
    setAddress(address)
  };

  //https://maps.googleapis.com/maps/api/place/textsearch/json?query=rome+tourist+attractions&language=en&key=AIzaSyBnf1JCVR3A8N4dFPVWbBn_TuHlHsG5x9E
  function getPlacesOfInterest(address: any) {
    const searchQuery = address+'toursit+attractions' 
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your API key

    // Construct the API request URL
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&language=en&key=${apiKey}`;

    // Call the API using the Fetch API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the API response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  const handleSelect = address => {
    console.log(address)
    fetchAttractions();
    geocodeByAddress(address)
      .then(results => {
        console.log(results)
        return getLatLng(results[0])
      })
      .then(latLng => {
        setLatlang(latLng);
        return console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input style={{width:"50%",margin:"20px auto 0px",display:"flex"}}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container" style={{width:"50%",margin:"auto"}}>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;


