import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, deleteItemCart, clearCart, deleteItemAll } from "../actions/cartAction";

import "./productBox.css";

const Cart = () => {
    const dispatch = useDispatch();

    const cart = useSelector(store => store.cart.cartData);

    useEffect(() => {
        if (cart.length === 0) {
            document.querySelector(".cart-length").style.display = "none";
        } else {
            document.querySelector(".cart-length").style.display = "flex";
            document.querySelector(".cart-length").textContent = cart.length;
        }

    }, [cart])

    const addToCart = (item) => {
        dispatch(setCart(item));        
    };

    const deleteItem = (id) => {
        dispatch(deleteItemCart(id));
    }

    const deleteItems = (itemId) => {
        dispatch(deleteItemAll(itemId));
    }

    const uniqueProducts = cart.filter((product, index) => index === cart.findIndex((p) => p.id === product.id));

    const cartContent = uniqueProducts.map(item => {
        
        return (
            <div key={item.id + item.title} className="content-card" >
                <img className="card-img" alt="" src={item.images[0]}></img>
                <div className="card-list">
                    <div className="card-product-info">
                        <p className="card-title">{item.title}</p>
                        <p className="card-price">{item.price}$</p>
                    </div>
                    <div className="card-btn" onClick={() => deleteItems(item.id)}>Удалить из корзины</div>
                    <div className="block-counter">
                            <button className="btn-counter" onClick={() => deleteItem(cart.findIndex(x => x.id === item.id))}><i className="fa-solid fa-minus fa-2xs"></i></button>
                            <span className="item-count">{cart.filter(x => x.id === item.id).length} шт.</span>
                            <button className="btn-counter" onClick={() => addToCart(item)}><i className="fa-solid fa-plus fa-2xs"></i></button>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <>
            <div className="container">
                <div className="cart-info">
                    <h1>Корзина ({cart.length})</h1>
                    <p className="clear-cart" onClick={() => dispatch(clearCart())}>Очистить корзину</p>
                </div>
                
                <div className="cart-container">
                    <div className="cards">
                        {cartContent}
                    </div>
                    <div className="cart-about">
                        <h1>Ваша корзина</h1>
                        <p>Товары ({cart.length})</p>
                        <h1>Общая стоимость {cart.reduce((p, c) => p += c.price, 0)}$</h1>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Cart;