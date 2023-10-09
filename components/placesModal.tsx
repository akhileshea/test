import * as React from "react";
import {
  Modal,
  Typography,
  makeStyles,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@material-ui/core";
import Rating from '@mui/material/Rating';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface PlaceModalProps {
  placeResult: google.maps.places.PlaceResult;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const PlaceModal: React.FC<PlaceModalProps> = ({ placeResult,modalOpen,setModalOpen }) => {
  const classes = useStyles();

  const handleOpen = () => {
    console.log(placeResult.rating)
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    console.log(placeResult.rating)
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="place-details"
        aria-describedby="place-details-description"
      >
        <div className={classes.paper}>
        <Box display="flex" alignItems="center">
                <Box flexGrow={1} >{placeResult.name}</Box>
                <Box>
                    <IconButton onClick={handleClose}>
                          <CloseIcon />
                    </IconButton>
                </Box>
          </Box>
          <Card>
            <CardMedia
              className={classes.media}
              image={placeResult.photos ? placeResult.photos[0].getUrl() : ""}
              title={placeResult.name}
            />
            <CardContent>
              <Typography variant="body1" component="p">
                {placeResult.formatted_address}
              </Typography>
              {placeResult.aspects && (
                <Typography variant="body2" component="p">
                  {placeResult.aspects.entries[0]}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Rating value={placeResult.rating} precision={0.1} readOnly />
              <Typography variant="body2" component="p">
                ({placeResult.user_ratings_total} ratings)
              </Typography>
            </CardActions>
          </Card>
          <Grid container spacing={2}>
            {placeResult.types?.map((type) => (
              <Grid item key={type}>
                <Typography variant="body1">{type}</Typography>
              </Grid>
            ))}
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default PlaceModal;
