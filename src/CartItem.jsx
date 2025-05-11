import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, addItem } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  // Redux store'dan sepet öğelerini al
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Tüm ürünler için toplam tutarı hesapla
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Sepetteki toplam ürün sayısını hesapla
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Alışverişe devam et butonuna tıklama işleyicisi
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Artırma butonuna tıklama işleyicisi
  const handleIncrement = (item) => {
    // Redux'a updateQuantity eylemini gönder
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  // Azaltma butonuna tıklama işleyicisi
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Ürün miktarı 1'den büyükse, miktarı 1 azalt
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      // Miktar 1 ise ve azaltılmak isteniyorsa ürünü tamamen kaldır
      dispatch(removeItem(item));
    }
  };

  // Kaldır butonuna tıklama işleyicisi
  const handleRemove = (item) => {
    // Redux'a removeItem eylemini gönder
    dispatch(removeItem(item));
  };

  // Bir ürün için miktar bazında toplam maliyeti hesapla
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace("$", ""));
    return (price * item.quantity).toFixed(2);
  };

  // Ödeme işlemi için işleyici (şimdilik sadece bir uyarı gösterir)
  const handleCheckoutShopping = (e) => {
    alert("Yakında hizmetinizde olacak!");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Shopping Cart</h2>
      <div style={{ color: "black", marginBottom: "10px" }}>
        Total Items: {getTotalItemCount()} | Total Amount: $
        {calculateTotalAmount()}
      </div>

      {cart.length === 0 ? (
        <div style={{ color: "black", marginTop: "20px" }}>
          <p>Your cart is empty.</p>
          <button
            className="get-started-button"
            onClick={(e) => handleContinueShopping(e)}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${calculateTotalCost(item)}
                  </div>
                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="continue_shopping_btn">
            <button
              className="get-started-button"
              onClick={(e) => handleContinueShopping(e)}
              aria-label="Continue shopping"
            >
              Continue Shopping
            </button>
            <br />
            <button
              className="get-started-button1"
              onClick={(e) => handleCheckoutShopping(e)}
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
