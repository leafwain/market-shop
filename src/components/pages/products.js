import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../actions/dataAction";
import { setCart, deleteItemCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import "./productBox.css";

const Products = ({ name, url }) => {
    const dispatch = useDispatch();

    const data = useSelector(store => store.data.data);
    const cart = useSelector(store => store.cart.cartData);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
        console.log(cart);
    }, [])

    useEffect(() => {
        if (cart.length === 0) {
            document.querySelector(".cart-length").style.display = "none";
        } else {
            document.querySelector(".cart-length").style.display = "flex";
            document.querySelector(".cart-length").textContent = cart.length;
        }        

    }, [cart])

    const getAllProducts = async () => {
        await fetch(`https://dummyjson.com${url}`)
        .then(res => res.json())
        .then(res => dispatch(setData(res.products)))
    };

    const addToCart = (item) => {
        // if (cart.filter(x => x.id === item.id).length > 0) {
        //     // dispatch(deleteItemCart(cart.findIndex(x => x.id === item.id)));
        //     navigate("/cart");
        //     console.log("Уже лежит в корзине", cart.findIndex(x => x.id === item.id));
            
        //     return;
        // }
        
        dispatch(setCart(item));        
    };

    const deleteItem = (id) => {
        dispatch(deleteItemCart(id));
    }
    
    const box = data.map(item => {
        let status = cart.filter(x => x.id === item.id).length > 0;
        let classes = status ? "card-btn in-cart" : "card-btn";

        return (
            <div key={item.id + item.title} className="content-card" >
                <img className="card-img" alt="" src={item.images[0]}></img>
                <div className="card-list">
                    <div className="card-product-info">
                        <p className="card-title">{item.title}</p>
                        <p className="card-price">{item.price}$</p>
                    </div>
                    <>
                        {classes.includes("in-cart") ? 
                        <div className="block-counter">
                            <button className="btn-counter" onClick={() => deleteItem(cart.findIndex(x => x.id === item.id))}><i className="fa-solid fa-minus fa-2xs"></i></button>
                            <span className="item-count">{cart.filter(x => x.id === item.id).length} шт.</span>
                            <button className="btn-counter" onClick={() => addToCart(item)}><i className="fa-solid fa-plus fa-2xs"></i></button>
                        </div> 
                        : 
                        <div className={classes} onClick={() => addToCart(item)}>{status ? "В корзине" : "В корзину"}</div>}
                    </>                    
                </div>
            </div>
        )
    })

    return (
        <div className="content-box">
            <div className="container">
                <p className="content-title">{name}</p>
                <div className="content">
                    {box}
                </div>
            </div>
        </div>
    )
}

export default Products;