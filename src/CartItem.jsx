import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import PropTypes from 'prop-types';

const CartItem = ({ handleContinueShoppingClick }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.cost, 0);
  };

  const calculateTotalCost = (item) => {
    return item.quantity * item.cost;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-description">{item.description}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                Subtotal: ${calculateTotalCost(item)}
              </div>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        Total: ${calculateTotalAmount()}
      </div>
      <button className="get-started-button" onClick={handleContinueShoppingClick}>Continue Shopping</button>
      <br />
      <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
    </div>
  );
};
CartItem.propTypes = {
  handleContinueShoppingClick: PropTypes.func.isRequired,
};

export default CartItem