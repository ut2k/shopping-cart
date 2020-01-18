import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardContent, Box } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ButtonGroup, Drawer, List, ListItem, ListItemIcon, InboxIcon, MailIcon, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import SimpleMenu from './Menu'

const useStyles = makeStyles(theme => ({
  cardy: {
    float: "right"
  },
  list: {
    width: 400,
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

  const [state, setState] = useState({ left: true });
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const [Items, setItems] = useState([]);
  const arr = Object.values(Items)
  const cartAdd = (shirt) => {
    console.log(shirt)
    let val = Items;
    let x = false;
    let i;
    for (i = 0; i < Items.length; i++) {
      if (Items[i].value === shirt) {
        x = true
        break;
      }
    }
    if (x) {
      Items[i].quantity += 1;
      console.log("Recounting", Items[i].quantity);
    }
    else {
      val.push({
        value: shirt
        , quantity: 1
      })
    }
    console.log("Shirts", shirt);
    console.log(Items[i].quantity);
    setItems(val);
    setState({ right: true });
  }

  const sumPrice = () =>
  {
    let sum = 0;
    for (let i = 0; i < Items.length; i++)
    {
      sum = sum + (Items[i].value.price * Items[i].quantity);
      console.log(Items[i].value.price);
      console.log(Items[i].quantity);
    }
    console.log(sum);
    return sum;
  }
  const Display = ({ product }) => {
    return (

      <Grid item xs={0} sm={2.1} alignItems="center" alignContent="center">
        <Card>
          <img src={"./data/products/" + product.sku + "_1.jpg"} alt="Cart icon" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {"Description: " + product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {"Price: $" + product.price}
            </Typography>

          </CardContent>
          <CardContent>
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
          </CardContent>
          <CardContent>
            <Button onClick={() => cartAdd(product)} variant="contained" color="primary" style={{ paddingBottom: 10 }}>
              Add to Cart
                </Button>
          </CardContent>


        </Card>
      </Grid>

    )

  };



  return (

    <div>
      <div>
        <Button onClick={toggleDrawer('right', true)} style={{ float: "right" }}><AddShoppingCartIcon style={{ fontSize: 50, float: "right" }} /></Button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
          <div>
            <Button variant="contained"><CloseIcon size="large" onClick={toggleDrawer('right', false)}/></Button>
          </div>
          <div className={classes.list} role="presentation">
            <List>
              {arr.map((text) => (
                <ListItem button key={text}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={"./data/products/" + text.value.sku + "_1.jpg"} />
                  </ListItemAvatar>
                  <ListItemText primary={text.value.title + ' | ' + text.value.description} />
                  <ListItemText style={{marginRight:50}}primary={'$' + text.value.price} />

                </ListItem>
              ))}

            </List>
            <Box style={{marginTop:800, }} component="span" display="block" p={1} m={1} bgcolor="background.paper"><h3>{'Total Price: $' + sumPrice()}</h3></Box>
          </div>
        </Drawer>
      </div>
      <div className={classes.control}>
        <Grid container>
          <Grid item>
            <Box textAlign="left" m={1} style={{ marginLeft: 100 }}>
              16 Product(s) found
                </Box>
          </Grid>

          <Grid item style={{ alignContent: "right", marginLeft: 1100 }}>
            <SimpleMenu style={{ alignContent: "right" }} />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} justify="center" alignItems="center">
          {products.map(product =>
            <Display product={product} />
          )};
        </Grid>
      </div>
    </div>
  )
}

export default App;