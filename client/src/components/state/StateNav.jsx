import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  styled,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import productList from "../../Constant/stateProducts";

// Category Circle Images
const categories = [
  { name: 'Suit Sets', image: 'https://img.theloom.in/pwa/catalog/product/cache/2226fcc140c013a71062820e2d717b92/3/2/328a5191.jpg' },
  { name: 'Sarees', image: 'https://suvidhafashion.com/cdn/shop/products/1-A.jpg?v=1680852247&width=600' },
  { name: 'Lehenga Sets', image: 'https://staticm247.kalkifashion.com/media/catalog/product/b/e/beige_bridal_lehenga_set-sg183857_3_.jpg?w=500' },
  { name: 'Dresses', image: 'https://www.vastranand.in/cdn/shop/files/1_871d6045-82d0-4209-b464-46ce51a4c7f3.jpg?v=1743078107' },
  { name: 'Anarkali Suit', image: 'https://subhvastra.in/cdn/shop/files/IMG_3600-1-scaled_600x.jpg?v=1717142938' },
  { name: 'Women’s Kurtas', image: 'https://apanakah.com/cdn/shop/products/2-034-979744.jpg?v=1626260057&width=1946' },
  { name: 'Loungewear', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3hopqx0bQz7zJo_xTGKuymADxh1hS2Nicw&s' },
  { name: 'Co-ord Sets', image: 'https://www.cationclothing.com/cdn/shop/products/17-3-2023_emeline_photo_by_mukesh1202_b242e8c6-a4cf-4a3f-b361-49ddb6fda5fe.jpg?v=1680088616' },
];

// Styled Components
const ProductCard = styled(Card)({
  maxWidth: 240,
  background: "#f9f9f9",
  borderRadius: 8,
});

const CategoryCircle = styled('img')({
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: 8,
});

const bannerUrl = "https://www.aachho.com/cdn/shop/files/Sakhiyan-2B.png?v=1743578352";

const StateNav = () => {
  const { stateName } = useParams();
  const stateProducts = productList[stateName?.toLowerCase()] || [];
  const dispatch = useDispatch();

  const categoryMap = stateProducts.reduce((acc, product) => {
    const category = product.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = (product) => {
    setIsAdding(true);
    dispatch(addToCart({ ...product, stateName }))
      .then(() => setIsAdding(false))
      .catch((error) => {
        setIsAdding(false);
        console.error("Error adding to cart", error);
      });
  };

  if (stateProducts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">No products available for {stateName?.toUpperCase()}</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Banner Strip */}
      <Box sx={{ backgroundColor: "#d32f2f", py: 1, color: "#fff", textAlign: "center", fontWeight: 500 }}>
        15% OFF | BUY 3 GET 20% OFF | CODE: PRE10
      </Box>

      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 3 }}>
        <img src="/Image/Indiculture.png" alt="Logo" style={{ height: 100, borderRadius: 100 }} />
        <Typography sx={{ marginLeft: 2, fontFamily: "cursive", fontWeight: 600, fontSize: 28, paddingTop: 2 }}>
          IndiCulture
        </Typography>
      </Box>

      {/* Banner Image */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <img
          src={bannerUrl}
          alt="Banner"
          loading="lazy"
          style={{ width: "100%", height: "auto", maxHeight: 240, objectFit: "cover", borderRadius: 8 }}
        />
      </Box>

      {/* Category Circles */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {categories.map((cat, i) => (
          <Grid item key={i}>
            <Box sx={{ textAlign: 'center' }}>
              <CategoryCircle src={cat.image} alt={cat.name} />
              <Typography variant="body2">{cat.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
        {stateName?.toUpperCase()} Collection
      </Typography>

      {/* Category-wise Products (All scrollable horizontally) */}
      {Object.entries(categoryMap).map(([category, products]) =>
        products.length > 0 ? (
          <Box key={category} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                textAlign: "left",
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {category} Collection
            </Typography>

            {/* Horizontally Scrollable */}
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                px: 2,
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#aaa',
                  borderRadius: 4,
                },
              }}
            >
              {products.map((product) => (
                <Box key={product.id} sx={{ minWidth: 240 }}>
                  <ProductCard>
                  <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 240,
                    objectFit: 'contain',
                    padding: 1,
                  }}
                />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2">{product.description}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <s>₹{product.price?.mrp}</s>{" "}
                        <b>₹{product.price?.cost}</b> ({product.price?.discount} OFF)
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#1976d2",
                            borderRadius: 20,
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              bgcolor: "#115293",
                            },
                          }}
                          size="small"
                          fullWidth
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdding}
                        >
                          {isAdding ? "Adding..." : "Add to Cart"}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#1976d2",
                            color: "#1976d2",
                            borderRadius: 20,
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              bgcolor: "#e3f2fd",
                              borderColor: "#115293",
                              color: "#115293",
                            },
                          }}
                          size="small"
                          fullWidth
                        >
                          Buy Now
                        </Button>
                      </Box>
                    </CardContent>
                  </ProductCard>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null
      )}
    </>
  );
};

export default StateNav;
