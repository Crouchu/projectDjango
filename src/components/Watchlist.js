import React, {useState, useEffect} from "react";
import {API} from '../apiService';
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  productName: {
    fontSize: "16px",
    textAlign: "left",
  },
  productText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "14px",
    textAlign: "left",
    
  },
}));

const Watchlist = () => {
  const [token] = useCookies(["token"]);
  const [data, setData] = useState(null);

  useEffect(() => {
    API.getWatchlist(token['token']).then((resp) => {
      setData({ resp });
    });
  }, [token]);

      

  const classes = useStyles();
  if (!data|| data.resp[0].products.length === 0)
    return <p>Can not find any products, sorry</p>;
  return (
    
    <React.Fragment>
      <Typography
      component="h1"
      variant="h4"
      color="textPrimary"
      align="center"
      gutterBottom
      >
        Lista obserwowanych produktów
      </Typography>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {data.resp[0].products.map((product) => {
            return (    
              // Enterprise card is full width at sm breakpoint
              <Grid item key={product.product_id} xs={12} md={4}>
                <Card className={classes.card}>
                  <Link
                    color="textPrimary"
                    href={"product/" + product.product_id}
                    className={classes.Link}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={product.image}
                      title={product.product_name}
                    />
                  </Link>

                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      className={classes.productName}
                    >
                      {product.product_name}
                    </Typography>
                    <div className={classes.productText}>
                      <Typography
                        component="p"
                        color="textPrimary"
                      ></Typography>
                        <Typography variant="p" color="textSecondary">
                        Kategoria: {product.category}
                      </Typography>  
                    </div>
                    <div className={classes.productText} >
                    <Typography variant="p" color="textSecondary"> Cena od: {product.min_price[0]} zł </Typography>
                    </div>
                    <div className={classes.productText}>
                    <Typography variant="p" color="textSecondary"> Dostępny w: {product.min_price[1]} sklepach</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Watchlist;
