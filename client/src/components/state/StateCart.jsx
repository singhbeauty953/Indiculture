import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StateCart = ({ cartAllProduct, setCartAllProduct }) => {
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item?.id === id
          ? { ...item, count: typeof item.count === "number" ? item.count + 1 : 2 }
          : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item?.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCartAllProduct((prev) => prev.filter((item) => item?.id !== id));
    }
  };

  const handleBuyNow = (product) => {
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    navigate("/checkout");
  };

  // Group products by state
  const groupedByState = cartAllProduct.reduce((acc, product) => {
    const state = product?.state || "Other";
    if (!acc[state]) acc[state] = [];
    acc[state].push(product);
    return acc;
  }, {});

  const calculateStateTotal = (items) =>
    items.reduce((sum, item) => {
      const count = typeof item.count === "number" ? item.count : 1;
      return sum + (item?.price?.cost || 0) * count;
    }, 0);

  const calculateGrandTotal = () =>
    cartAllProduct.reduce((sum, item) => {
      const count = typeof item.count === "number" ? item.count : 1;
      return sum + (item?.price?.cost || 0) * count;
    }, 0);

  return (
    <>
      <div className="container-fluid">
        {Object.keys(groupedByState).length === 0 ? (
          <div className="text-center my-5">
            <h3>No Products Available in Cart</h3>
          </div>
        ) : (
          Object.entries(groupedByState).map(([state, items]) => (
            <div  key={state} className="mb-4">
              <h4 className="text-uppercase border-bottom pb-2 mb-3">
                {state} Products
              </h4>

              {items.map((product) => (
                <div className="product-row" key={product?.id} style={{background:'black'}}>
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="product-image"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=No+Image")
                    }
                  />

                  <div className="product-details" style={{color:'#fff'}}>
                    <div className="details-top">
                      <h5 style={{color:'#fff'}}>{product?.name}</h5>

                      <p className="m-0 text-muted">MRP: ₹{product?.price?.mrp}</p>
                      <p className="m-0">Cost: ₹{product?.price?.cost}</p>
                      <p className="m-0 text-success">
                        Discount: {product?.price?.discount}
                      </p>
                      <p className="m-0">{product?.description}</p>
                    </div>

                    <div className="quantity-remove">
                      <div className="quantity-controls">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrement(product?.id)}
                        >
                          −
                        </button>
                        <span>{isNaN(product?.count) ? 1 : product?.count}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrement(product?.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="button-actions ">
            
                      <div className="button-actions">
                        <Button
                            variant="outlined"
                            type="button"
                            onClick={() => handleBuyNow(product)}
                            aria-label="Checkout product"
                            sx={{
                            borderRadius: 20,
                            fontSize: 14,
                            color: '#ff9933',
                            borderColor: '#ff9933',
                            '&:hover': {
                                backgroundColor: '#ff9933',
                                color: '#000',
                                borderColor: '#ff9933',
                            },
                            width: { xs: '100%', sm: 'auto' },
                            textTransform: 'none',
                            mr: 2,
                            }}
                            startIcon={<i className="fa-solid fa-truck-fast"></i>}
                        >
                            Checkout
                        </Button>
                        <Button
                            variant="outlined"
                            type="button"
                            className="remove-btn"
                            onClick={() => handleDeleteItem(product?.id)}
                            aria-label="Remove product from cart"
                            sx={{
                                borderRadius: 20,
                                fontSize: 14,
                                color: '#ff9933',
                                borderColor: '#ff9933',
                                '&:hover': {
                                backgroundColor: '#ff9933',
                                color: '#000',
                                borderColor: '#ff9933',
                                },
                            }}
                            >
                            <i className="fa-solid fa-trash me-1"></i> Remove
                            </Button>
                        </div>
                        </div>
                     </div>
                  </div>
                </div>
              ))}

              <div className="text-end pe-3">
                <strong>Total ({state}): ₹{calculateStateTotal(items)}</strong>
              </div>
            </div>
          ))
        )}

        {Object.keys(groupedByState).length > 0 && (
          <div className="text-end pe-3 mt-4">
            <h5>Grand Total: ₹{calculateGrandTotal()}</h5>
          </div>
        )}
      </div>

      {/* Embedded Styling */}
      <style>{`
        .container-fluid {
          padding: 1rem 2rem;
          max-width: 900px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h4.text-uppercase {
          font-weight: 700;
          border-bottom: 2px solid #444;
          padding-bottom: 0.4rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        .product-row {
          background-color: #f9f9f9;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .product-image {
          flex: 0 0 150px;
          max-width: 150px;
          border-radius: 8px;
          object-fit: contain;
          max-height: 150px;
          background: #fff;
          border: 1px solid #ddd;
        }

        .product-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        h5 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: #34495e;
        }

        .text-muted {
          color: #7f8c8d !important;
        }

        .text-success {
          color: #27ae60 !important;
        }

        .quantity-remove {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-outline-secondary.btn-sm {
          width: 30px;
          height: 30px;
          padding: 0;
          font-size: 1.25rem;
          line-height: 1;
          border-radius: 50%;
        }

        .btn-link.text-danger {
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          color: #dc3545;
        }

        .text-end.pe-3 strong {
          font-size: 1.15rem;
          margin-top: 0.75rem;
          display: inline-block;
        }

        @media (max-width: 767px) {
          .product-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .quantity-remove {
            flex-direction: column;
            align-items: center;
          }

          .text-end {
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
};

export default StateCart;
