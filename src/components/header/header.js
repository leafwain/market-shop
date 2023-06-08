import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const cart = useSelector(store => store.cart.cartData);
    const headerLinks = useRef();

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("burger-icon")) {
                headerLinks.current.style.display = "none";
                [...headerLinks.current.children].forEach(el => { el.style.borderBottom = "none" });
                headerLinks.current.style.flexDirection = "row";
                
                setMenuActive(false);
            }
        })
    }, [])

    useEffect(() => {
        if (cart.length === 0) {
            document.querySelector(".cart-length").style.display = "none";
        } else {
            document.querySelector(".cart-length").style.display = "flex";
            document.querySelector(".cart-length").textContent = cart.length;
        }

    }, [cart])

    const burgerShow = () => {
        if (!menuActive) {
            headerLinks.current.style.display = "flex";
            setTimeout(() => {
                [...headerLinks.current.children].forEach(el => { el.style.borderBottom = "1px solid black" });
                headerLinks.current.style.flexDirection = "column";

                setMenuActive(true);
            },25);
            
        } else {
            setTimeout(() => {
                headerLinks.current.style.display = "none";
                [...headerLinks.current.children].forEach(el => { el.style.borderBottom = "none" });
                headerLinks.current.style.flexDirection = "row";
            }, 200);
                     
            setMenuActive(false);
        }        
    };

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header-up">
                        <Link to="/"><h1 className="logo">Market Shop</h1></Link>
                        <Link to="/cart"><h1 className="category cart"><span className="cart-text">Корзина</span><span className="cart-length"></span><i className="fa-solid fa-cart-shopping"></i></h1></Link>
                    </div>
                    <div className="header-down">
                        <div className="burger category">
                            <i className={menuActive ? "burger-icon active fa-solid fa-xmark" : "burger-icon fa-solid fa-bars"} onClick={(e) => burgerShow(e)}></i>
                        </div>
                        <div className={menuActive ? "header-links active" : "header-links"} ref={headerLinks}>
                            <NavLink to="/"><h1 className="category">Все товары</h1></NavLink>
                            <NavLink to="/smartphones"><h1 className="category">Смартфоны</h1></NavLink>
                            <NavLink to="/laptops"><h1 className="category">Ноутбуки</h1></NavLink>
                            <NavLink to="/home-decoration"><h1 className="category">Украшение дома</h1></NavLink>
                            <NavLink to="/furniture"><h1 className="category">Мебель</h1></NavLink>
                            <NavLink to="/groceries"><h1 className="category">Продукты</h1></NavLink>
                        </div>
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;