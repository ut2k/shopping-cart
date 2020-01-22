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
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB8CaRsqtVcKVbXXrFiGLsibyz_kLf1TBI",
  authDomain: "shopping-cart-48a84.firebaseapp.com",
  databaseURL: "https://shopping-cart-48a84.firebaseio.com",
  projectId: "shopping-cart-48a84",
  storageBucket: "shopping-cart-48a84.appspot.com",
  messagingSenderId: "871412875135",
  appId: "1:871412875135:web:6230cdf1003c976a94e44a",
  measurementId: "G-1F5W6NRTNL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

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
  const [inventory, setInventory] = useState({});
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };

    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    fetchProducts();
    return () => { db.off('value', handleData); };
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
  const arr = Object.values(Items);
  const cartAdd = (shirt, size, boo) => {
    let sz;
    let newInventory = inventory;
    if (boo) {
      let val = Items;
      let x = false;
      let i;
      let j;
      let val1 = bold;
      for (i = 0; i < Items.length; i++) {
        if (Items[i].value === shirt) {
          for (j = 0; j < bold.length; j++) {
            if (val1[j][0] === Items[i].value.title) {
              if (Items[i].size === val1[j][1]) {
                x = true;
                Items[i].quantity += 1;
                sz = val1[j][1];
                break;
              }
            }
          }
          if (x) { break; }
        }
      }
      if (!x) {
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
          val.push({
            value: shirt
            , quantity: 1
            , size: bold[k][1]
          })
          sz = bold[k][1];
        }
        else {
          val.push({
            value: shirt
            , quantity: 1
            , size: 'M'
          })
          sz = 'M';
        }
      }
      setItems(val);
      setState({ right: true });
      newInventory[shirt.sku][sz] -= 1;
      setInventory(newInventory);
    }
    else {
      cartRemove(shirt, size)
      setState({ right: true });
      setInventory(newInventory);
    }
  }

  const cartRemove = (shirt, size) => {
    let val = Items;
    let newInventory = inventory;
    let i;
    let boo = false;
    let sz;
    for (i = 0; i < Items.length; i++) {
      if (Items[i].value === shirt && Items[i].size === size) {
        sz = size;
        Items[i].quantity -= 1;
        newInventory[shirt.sku][sz] += 1;
        if (Items[i].quantity === 0) {
          val.splice(val.indexOf(val[i]), 1);
        }
        if (boo) { break; }
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
      ButtonExist(product);
    };
    let sizeSG;
    let sizeMG;
    let sizeLG;
    let sizeXLG;

    if (inventory[product.sku]) {
      sizeSG = inventory[product.sku].S;
      sizeMG = inventory[product.sku].M;
      sizeLG = inventory[product.sku].L;
      sizeXLG = inventory[product.sku].XL;
    }
    else {
      sizeSG = true;
      sizeMG = true;
      sizeLG = true;
      sizeXLG = true;
    }

    const [button, setButton] = useState({
      small: sizeSG,
      medium: sizeMG,
      large: sizeLG,
      xlarge: sizeXLG
    });
    const ButtonExist = () => {
      let sizeS = false;
      let sizeM = false;
      let sizeL = false;
      let sizeXL = false;
      if (inventory[product.sku].S > 0) {
        sizeS = true;
      }
      if (inventory[product.sku].M > 0) {
        sizeM = true;
      }
      if (inventory[product.sku].L > 0) {
        sizeL = true;
      }
      if (inventory[product.sku].XL > 0) {
        sizeXL = true;
      }
      setButton({
        small: sizeS,
        medium: sizeM,
        large: sizeL,
        xlarge: sizeXL
      });
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
              {button.small && <ToggleButton value="left" onClick={() => handleBold(product, "S")} aria-label="left aligned">
                S
            </ToggleButton>}
              {button.medium && <ToggleButton value="center" onClick={() => handleBold(product, "M")} aria-label="centered">
                M
            </ToggleButton>}
              {button.large && <ToggleButton value="right" onClick={() => handleBold(product, "L")} aria-label="right aligned">
                L
            </ToggleButton>}
              {button.xlarge && <ToggleButton value="justify" onClick={() => handleBold(product, "XL")} aria-label="justified">
                XL
            </ToggleButton>}
            </ToggleButtonGroup>
          </CardContent>
          <CardContent>
            <Button key={product.sku} onClick={() => cartAdd(product, 1, true)} variant="contained" color="primary" style={{ paddingBottom: 10 }}>
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
                <ListItem button key={text.value.sku + text.size}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={"./data/products/" + text.value.sku + "_1.jpg"} />
                  </ListItemAvatar>
                  <ListItemText primary={text.value.title + ' | Size: ' + text.size + ' | Quantity: ' + text.quantity} />
                  <ListItemText style={{ marginRight: 50 }} primary={'$' + text.value.price} />
                  <Button variant="contained" color="primary" onClick={() => cartAdd(text.value, text.size, false)}><CloseIcon size="large" /></Button>

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