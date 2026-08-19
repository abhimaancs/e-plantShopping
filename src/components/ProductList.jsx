import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import plants from "../plants";

function ProductList() {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const categories = [...new Set(plants.map((plant) => plant.category))];

    const isInCart = (plantId) => {
        return cartItems.some((item) => item.id === plantId);
    };

    const handleAddToCart = (plant) => {
        dispatch(addToCart(plant));
    };

    return (
        <div className="products-page">
            <h1>Our Plants</h1>

            {categories.map((category) => (
                <section key={category} className="plant-category">
                    <h2>{category}</h2>

                    <div className="plant-grid">
                        {plants
                            .filter((plant) => plant.category === category)
                            .map((plant) => (
                                <div className="plant-card" key={plant.id}>
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        className="plant-image"
                                    />

                                    <h3>{plant.name}</h3>

                                    <p className="plant-price">
                                        ${plant.price}
                                    </p>

                                    <button
                                        className="add-cart-btn"
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={isInCart(plant.id)}
                                    >
                                        {isInCart(plant.id)
                                            ? "Added ✓"
                                            : "Add to Cart"}
                                    </button>
                                </div>
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductList;