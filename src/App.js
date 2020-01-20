import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardContent, Box } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
  const cartAdd = (shirt, boo) => {
    if (boo) {
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
        let j;
        let val1 = bold;
        for (j = 0; j < bold.length; j++) {
          if (val1[j][0] === Items[i].value.title) {
            if (Items[i].size === val1[j][1]) {
              Items[i].quantity += 1;
            }
            else {
              val.push({
                value: shirt
                , quantity: 1
                , size: val1[j][1]
              })
            }
          }
        }

      }
      else {
        setBold(bold);
        let statement = false;
        let k;
        for (k = 0; k < bold.length; k++) { 
          if (bold[k][0] === shirt.title) {  
            statement = true;
            break;
          }
        }
        if (statement) {
          console.log('impossible')
          val.push({
            value: shirt
            , quantity: 1
            , size: bold[k][1]
          })
        }
        else {
          val.push({
            value: shirt
            , quantity: 1
            , size: 'M'
          })
        }

      }
      setItems(val);
      setState({ right: true });
    }
    else {
      cartRemove(shirt)
      setState({ right: true });
    }

  }

  const cartRemove = (shirt) => {
    let val = Items;
    let i;
    for (i = 0; i < Items.length; i++) {
      if (Items[i].value === shirt) {
        Items[i].quantity -= 1;
        if (Items[i].quantity === 0) {
          val.splice(val.indexOf(val[i]), 1)
        }
        break;
      }
    }
    setItems(val);
  }

  const sumPrice = () => {
    let sum = 0;
    for (let i = 0; i < Items.length; i++) {
      sum = sum + (Items[i].value.price * Items[i].quantity);
    }
    return sum;
  }

  const Display = ({ product }) => {

    const [alignment, setAlignment] = React.useState();
    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
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
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment">
              <ToggleButton value="left" onClick={() => handleBold(product, "S")} aria-label="left aligned">
                S
            </ToggleButton>
              <ToggleButton value="center" onClick={() => handleBold(product, "M")} aria-label="centered">
                M
            </ToggleButton>
              <ToggleButton value="right" onClick={() => handleBold(product, "L")} aria-label="right aligned">
                L
            </ToggleButton>
              <ToggleButton value="justify" onClick={() => handleBold(product, "XL")} aria-label="justified">
                XL
            </ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          <CardContent>
            <Button key={product.sku} onClick={() => cartAdd(product, true)} variant="contained" color="primary" style={{ paddingBottom: 10 }}>
              Add to Cart
                </Button>
          </CardContent>


        </Card>
      </Grid>

    )

  };
  const [bold, setBold] = React.useState([]);

  const handleBold = (product, size) => {
    let val = bold;
    let statement = false;
    let i;
    for (i = 0; i < bold.length; i++) {
      if (val[i][0] === product.title) {
        val[i][1] = size;
        statement = true;
      }
    }
    if (!statement) {
      val.push([product.title, size]);
    }
    setBold(val);
  };
  return (

    <div>
      <div>
        <Button onClick={toggleDrawer('right', true)} style={{ float: "right" }}><AddShoppingCartIcon style={{ fontSize: 50, float: "right" }} /></Button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
          <div>
            <Button variant="contained"><CloseIcon size="large" onClick={toggleDrawer('right', false)} /></Button>
          </div>
          <div className={classes.list} role="presentation">
            <List>
              {arr.map((text) => (
                <ListItem button key={text.value.title + text.value.size}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={"./data/products/" + text.value.sku + "_1.jpg"} />
                  </ListItemAvatar>
                  <ListItemText primary={text.value.title + ' | Size: ' + text.size + ' | Quantity: ' + text.quantity} />
                  <ListItemText style={{ marginRight: 50 }} primary={'$' + text.value.price} />
                  <Button variant="contained" color="primary" onClick={() => cartAdd(text.value, false)}><CloseIcon size="large" /></Button>

                </ListItem>
              ))}

            </List>
            <Box style={{ marginTop: 800 }} component="span" display="block" p={1} m={1} bgcolor="background.paper"><h3>{'Total Price: $' + sumPrice()}</h3></Box>
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
            <Display key={product.sku} product={product} />
          )}
        </Grid>
      </div>
    </div>
  )
}

export default App;