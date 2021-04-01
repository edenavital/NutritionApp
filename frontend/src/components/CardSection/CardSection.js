import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FoodIlustration from '../../assets/icons/banner_ilustration.jpg'
import { useHistory } from 'react-router-dom';
import { ROUTERPATHS } from '../../constants/constants';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "0 auto"
  },
  buttons: {
    outline: 'none !important'
  }
});

const CardSection = ({topTitle, bottomTitle, bottomSubtitle}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    
    <Card className={classes.root}>

      <CardMedia
        component="img"
        alt="Food Ilustration"
        height="100%"
        image={FoodIlustration}
      />
    
      
      <CardContent>
          <Typography variant="h6">
            {topTitle}
          </Typography>
          <Typography gutterBottom variant="h6">
            {bottomTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bottomSubtitle}
          </Typography>
        </CardContent>

      <CardActions>
        <Button size="small" color="primary" classes={{root: classes.buttons}} onClick={() => history.push(ROUTERPATHS.FOOD)}>
          Add Food
        </Button>
        <Button size="small" color="primary" classes={{root: classes.buttons}} onClick={() => history.push(ROUTERPATHS.FOOD_LIST)}>
          Remove Food
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardSection;