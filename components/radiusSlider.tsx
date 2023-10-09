import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 300,
    margin:"auto"
  },
}));

interface SearchRadiusSliderProps {
   radius: number;
   setRadius: (radius:number) => void;
  }
const SearchRadiusSlider:React.FC<SearchRadiusSliderProps> = ({radius,setRadius}) => {
  const classes = useStyles();

  const handleSearchRadiusChange = (event: any, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  return (
    <div className={classes.root}>
      <Typography id="search-radius-slider" gutterBottom>
        Search radius in kms
      </Typography>
      <Slider
        value={radius}
        min={1}
        max={5}
        step={1}
        onChange={handleSearchRadiusChange}
        aria-labelledby="search-radius-slider"
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default SearchRadiusSlider;
