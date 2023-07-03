import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../actions/dataAction";
import { setCart, deleteItemCart } from "../actions/cartAction";
import { useNavigate, useMatch } from "react-router-dom";
import Sorting from '../sorting/';
import CircularProgress from '@mui/material/CircularProgress';
import { getService } from "../../api/api";
import "./products.scss";

const Products = ({ name, url, searchStatus = false }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let data = useSelector(store => store.data.data);
    const cart = useSelector(store => store.cart.cartData);
    const sortValue = useSelector(store => store.sortData.value);
    const searchParams = useMatch("/search/:words")?.params.words.toLowerCase();

    if (searchStatus) {
        // data = data.filter(x => [searchParams].some(word => x.title.toLowerCase().includes(word)));
        data = data.filter(x => x.title.toLowerCase().includes([searchParams].join(" ")));
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            const jsonData = await getService(url);
            dispatch(setData(jsonData.products));                       
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
    };

    const errorMessage = error ? <span style={{ color: "red", fontSize: "30px" }}>Ошибка сервера</span> : null;
    const spinner = loading ? <CircularProgress /> : null;

    const sortedData = () => {
        switch (sortValue) {
            case "popular":
                return [...data].sort((prev, cur) => prev.rating < cur.rating ? 1 : -1);
            case "cheaper":
                return [...data].sort((prev, cur) => prev.price > cur.price ? 1 : -1);
            case "expensive":
                return [...data].sort((prev, cur) => prev.price < cur.price ? 1 : -1);
            default:
                return data;
        }
    };

    const handleDirect = (item) => {
        navigate(`/products/${item.id}`);
    };

    const box = sortedData().map(item => {
        let status = cart.filter(x => x.id === item.id).length > 0;
        let classes = status ? "card-btn in-cart" : "card-btn";

        return (
            <div key={item.id + item.title} className="content-card" >
                <div className="img-wrapper" onClick={() => handleDirect(item)}>
                    <img className="card-img" alt="" src={item.images[0]}></img>  
                    <div className="overlay"></div>
                </div>              
                <div className="card-list">
                    <div className="card-product-info" onClick={() => handleDirect(item)}>
                        <p className="card-title">{item.title}</p>
                        <p className="card-price">{item.price}$</p>
                        <span>Рейтинг: {item.rating}</span>
                    </div>
                    <>
                        {status ?
                            <div className="block-counter">
                                <button className="btn-counter" onClick={() => deleteItem(cart.findIndex(x => x.id === item.id))}><i className="fa-solid fa-minus fa-2xs"></i></button>
                                <span className="item-count">{cart.filter(x => x.id === item.id).length} шт.</span>
                                <button className="btn-counter" onClick={() => dispatch(setCart(item))}><i className="fa-solid fa-plus fa-2xs"></i></button>
                            </div>
                            :
                            null
                        }
                        <div className={classes} onClick={() => addToCart(item)}>{status ? "В корзине" : "Купить"}</div>
                    </>
                </div>
            </div>
        )
    })

    return (
        <div className="content-box">
            <div className="container">
                <p className="content-title">{name}</p>
                {(!spinner && !errorMessage) ? <Sorting /> : null}
                <div className="content">
                    {spinner}
                    {errorMessage}
                    {(!spinner && !errorMessage) ? box : null}
                </div>
            </div>
        </div>
    )
}

export default Products;