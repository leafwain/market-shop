import { useRef, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    const [headerState, setHeaderState] = useState(false);
    const headerDown = useRef();

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("burger-icon")) {
                [...headerDown.current.children].slice(1).forEach(el => { el.style.display = "none"; el.style.borderBottom = "none" });
                headerDown.current.style.flexDirection = "row";
                document.querySelector(".burger-icon").classList.replace("fa-xmark", "fa-bars");
                setHeaderState(false);
            }
        })
    }, [])

    const burgerShow = () => {
        if (!headerState) {
            [...headerDown.current.children].slice(1).forEach(el => { el.style.display = "block"; el.style.borderBottom = "1px solid black" });
            headerDown.current.style.flexDirection = "column";
            document.querySelector(".burger-icon").classList.replace("fa-bars", "fa-xmark");
            setHeaderState(true);
        } else {
            [...headerDown.current.children].slice(1).forEach(el => { el.style.display = "none"; el.style.borderBottom = "none" });
            headerDown.current.style.flexDirection = "row";
            document.querySelector(".burger-icon").classList.replace("fa-xmark", "fa-bars");
            setHeaderState(false);
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
                    <div className="header-down" ref={headerDown}>
                        <div className="burger category">
                            <i className="burger-icon fa-solid fa-bars" onClick={(e) => burgerShow(e)}></i>
                        </div>
                        <NavLink to="https://leafwain.github.io/market-shop/"><h1 className="category">Все товары</h1></NavLink>
                        <NavLink to="https://leafwain.github.io/market-shop/smartphones"><h1 className="category">Смартфоны</h1></NavLink>
                        <NavLink to="https://leafwain.github.io/market-shop/laptops"><h1 className="category">Ноутбуки</h1></NavLink>
                        <NavLink to="https://leafwain.github.io/market-shop/home-decoration"><h1 className="category">Украшение дома</h1></NavLink>
                        <NavLink to="https://leafwain.github.io/market-shop/furniture"><h1 className="category">Мебель</h1></NavLink>
                        <NavLink to="https://leafwain.github.io/market-shop/groceries"><h1 className="category">Продукты</h1></NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;