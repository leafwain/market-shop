import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { setCart, deleteItemCart } from "../actions/cartAction";

import "./productDetails.css";

const ProductDetails = () => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const cart = useSelector(store => store.cart.cartData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productId = useMatch("/products/:productId").params.productId;

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products`);
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }
            const jsonData = await response.json();
            setAllProductsData(jsonData.products);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    const addToCart = (item) => {
        if (cart.filter(x => x.id === item.id).length > 0) {
            navigate("/cart");
            return;
        }
        dispatch(setCart(item));
    };

    const deleteItem = (id) => {
        dispatch(deleteItemCart(id));
    }

    let product = allProductsData.find(el => el.id === +productId);

    let status = product !== undefined ? cart.filter(x => x.id === product.id).length > 0 : null;
    let classes = status ? "card-btn card-btn-details in-cart" : "card-btn card-btn-details";
    
    return (
        <div className="container">
            <div className="content-card" >
                {(error && !loading) || (!loading && product === undefined)
                ? 
                 <div className="item-details">
                    <div className="item-error">Произошла ошибка, данный товар отсутствует в продаже</div>
                 </div>
                :
                null
                }

                {!error && !loading && product !== undefined
                ?
                <div className="item-details">
                    <div className="item-details-left">
                        <h1 className="card-title">{product.title}</h1>
                        <img className="card-img img-details" alt="" src={product.images[0]}></img>
                        <div className="item-description">
                            <h1>Описание</h1>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="item-details-right">
                        <div className="card-list">
                            <div className="card-product-info card-product-info-details">                            
                                <p className="card-price card-price-details">{product.price}$</p>
                                <span>Рейтинг: {product.rating}</span>
                            </div>
                        </div>                        
                        <>
                            {status ?
                                <div className="block-counter">
                                    <button className="btn-counter" onClick={() => deleteItem(cart.findIndex(x => x.id === product.id))}><i className="fa-solid fa-minus fa-2xs"></i></button>
                                    <span className="item-count">{cart.filter(x => x.id === product.id).length} шт.</span>
                                    <button className="btn-counter" onClick={() => dispatch(setCart(product))}><i className="fa-solid fa-plus fa-2xs"></i></button>
                                </div>
                                :
                                null
                            }
                            <div className={classes} onClick={() => addToCart(product)}>{status ? "В корзине" : "Купить"}</div>
                        </>
                    </div>                                        
                </div>
                :
                null}
            </div>
        </div>
    )
};

export default ProductDetails;