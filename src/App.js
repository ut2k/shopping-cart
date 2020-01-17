import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardContent } from '@material-ui/core';

import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardy: {
    
  },
  
  control: {
    padding: theme.spacing(4),
    textAlign: 'center',
    width: 1600,
  },
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div className={classes.control}>
    <Grid container spacing={10} justify="center" alignItems="center">
      {products.map(product =>
        <Grid item xs={3} alignItems="center" alignContent="center">
          <Card>
            <img src={"./data/products/" + product.sku + "_1.jpg"} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {"Description: "+product.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {"Price: $" + product.price}
              </Typography>

            </CardContent>
            <ButtonGroup size="large">
              <Button variant="contained">
                S
            </Button>
              <Button variant="contained">
                M
            </Button>
              <Button variant="contained">
                L
            </Button>
              <Button variant="contained">
                XL
            </Button>
            </ButtonGroup>

          </Card>
        </Grid>
      )};
      </Grid>
    </div>
  )
}

export default App;