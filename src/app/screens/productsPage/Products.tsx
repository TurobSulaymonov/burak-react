import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, PaginationItem, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import paginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setChosenProduct, setProducts, setRestaurant } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});


    // REDUX SLICE & SELECTOR 
    const productsRetriever = createSelector(
      retrieveProducts,
      (products) => ({products}),
    );




export default function Products() {
   const {setProducts} = actionDispatch(useDispatch());
   const {products} = useSelector(productsRetriever);
   const [productSearch, setProductsSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
   });

   const [searchText, setSearchText] = useState<string>("");
   const history = useHistory();

  useEffect(() =>{
    const product = new ProductService();
    product.getProducts(productSearch).then((data) => setProducts(data))
      .catch(err => 
        console.log("ERROR:", err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = "";
      setProductsSearch({...productSearch });
    }
  })

 /* * HANDLERS * */
 const searchCollectionHandler = (collecion: ProductCollection) => {
   productSearch.page = 1;
   productSearch.productCollection = collecion;
   setProductsSearch({...productSearch});
 };
 const searchOrderHandler = (order:string) => {
  productSearch.page = 1;
  productSearch.order = order;
  setProductsSearch({...productSearch});
 };

 const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductsSearch({...productSearch})
 };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductsSearch({...productSearch});
  }

  const chooseDishHandler = (id: string) => {
   history.push(`/products/${id}`);
  }

  return (
    <div className="products">
      <Container>

        <Stack flexDirection={"column"} alignItems={"center"}>

          <Stack className={"avatar-txt-srch"}>
            <Box className={"burak-restaurant-txt"}> Burak Restaurant</Box>

            <Stack className="inputs">
              <input
                className="input-srch"
                name="singleResearch"
                type="search"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if(e.key === "Enter") searchProductHandler();
                  }}
              />
              <Button className="input-btn"
              variant="contained"
              endIcon={<SearchIcon/>}
              onClick={searchProductHandler}>
                SEARCH
               {/*  <SearchIcon /> */}
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"dishes-filter-section"}>
          <Stack className={"dishes-filter-box"}>
            <Button variant={"contained"} 
            className="order"
            color=
            {productSearch.order === "createdAt" ?  "primary"
            : "secondary"} 
            onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>

            <Button variant={"contained"}
            className="order"
            color={productSearch.order === "productPrice" ? "primary"
            : "secondary"}
            
             onClick={() => searchOrderHandler("productPrice")}
             >
              Price
            </Button>

            <Button variant={"contained"}
            className="order"
             color={productSearch.order === "productViews"  ?  "primary"
             : "secondary"}
              onClick={() => searchOrderHandler("productViews")}>
              Views
            </Button>
          </Stack>
        </Stack>

        <Stack className={"list-category-section"}>
          <Stack>
            <div className="gategory-main">
              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.OTHER
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>
                Other
              </Button>

              <Button variant={"contained"} 
              color={
                productSearch.productCollection === ProductCollection.DESSERT
                ?  "primary"
                : "secondary"
              } onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>
                Dessert
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.DRINK
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                Drink
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.SALAD
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                Salad
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.DISH
                ?  "primary"
                : "secondary"
              }

              onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
                Dish
              </Button>
            </div>
          </Stack>


          <Stack className="products-wrapper">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages}`;
                const sizeVolume = 
                product.productCollection === ProductCollection.DRINK
                ? product.productVolume + "litre"
                : product.productSize + "size";
                return (
                  <Stack key={product._id} className="product-card" onClick={() => chooseDishHandler(product._id)}>
                    <Stack
                      className={"product-img"}
                      sx={{ backgroundImage: `url(${imagePath})` }}
                    >
                      <div className={"product-sale"}>{sizeVolume}</div>
                       <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex", 
                              marginLeft:"10px"
                            }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{right: "36px"}}>
                        
                        <Badge
                          className="eye"
                          badgeContent={product.productViews}
                          color="secondary"
                        >
                        <RemoveRedEyeIcon
                        sx={{
                          color: product.productViews === 0 ? "gray": "white"
                        }}
                        />
                        </Badge>
                        </Button>
                       </Stack>

                    <Box className={"product-desc"}>
                      <span className={"product-title"}>
                        {product.productName}
                      </span>
                      <div className={"product-desc-txt"}>
                        <MonetizationOnIcon  color="secondary"/>
                        {product.productPrice}
                      </div>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Product are not available!</Box>
            )}
          
        </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length ! == 0 
                ? productSearch.page + 1
                : productSearch.page 
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>

      </Container>
      
      <div className={"brands-logo"}>
        <Container>
          <Stack className="brand-title">
            <Box className={"brand-txt"}>Our Famliy Brands</Box>
        </Stack>
        

        <Stack className="brand-all-box">
          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/gurme.webp" />
            </Stack>
          </Stack>

          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/sweets.webp" />
            </Stack>
          </Stack>

          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/seafood.webp" />
            </Stack>
          </Stack>

          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/doner.webp" />
            </Stack>
          </Stack>
        </Stack>
        </Container>
      </div>
     
      <div className={"address"}>
        <Container>
          <Stack className="address-area">
            <Box className={"title"}>Our Addres</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}