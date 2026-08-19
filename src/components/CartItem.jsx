import { useSelector, useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "../redux/CartSlice";
import { Link } from "react-router-dom";

function CartItem() {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Your Shopping Cart</h1>
                <p>Your cart is currently empty.</p>

                <Link to="/plants" className="continue-shopping-btn">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            <div className="cart-items">
                {cartItems.map((item) => {
                    const itemTotal = item.price * item.quantity;

                    return (
                        <div className="cart-item" key={item.id}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image"
                            />

                            <div className="cart-item-details">
                                <h2>{item.name}</h2>

                                <p>
                                    Unit Price: ${item.price}
                                </p>

                                <div className="quantity-controls">
                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.id))
                                        }
                                        disabled={item.quantity === 1}
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.id))
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="item-total">
                                    Item Total: ${itemTotal}
                                </p>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-summary">
                <h2>Total: ${totalAmount}</h2>

                <div className="cart-actions">
                    <Link
                        to="/plants"
                        className="continue-shopping-btn"
                    >
                        Continue Shopping
                    </Link>

                    <button
                        className="checkout-btn"
                        onClick={() => alert("Checkout Coming Soon!")}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;