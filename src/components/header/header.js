import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material";
import "./header.scss";

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
    '&.MuiOutlinedInput-root': {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0050e0',
        },
    },
}));

const Header = () => {    
    const [menuActive, setMenuActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const location = useLocation();
    const cart = useSelector(store => store.cart.cartData);
    const navigate = useNavigate();
    const headerLinks = useRef();
    const inputSearch = useRef();

    useEffect(() => {
        if (!location.pathname.includes("search")) {
          setInputValue("");
        }
      }, [location]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = inputSearch.current.firstChild.value;

        if (inputValue.trim().length !== 0) {
            navigate(`/search/${[inputValue].join("-")}`);
        }        
    };

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header-up">
                        <div className="header-link-logo"><Link to="/"><h1 className="logo">Market Shop</h1></Link></div>
                        <div className="header-form">
                            <form action="#" onSubmit={(e) => handleSubmit(e)}>
                                <StyledOutlinedInput className="header-form-input"
                                    sx={{ flex: 1 }}
                                    placeholder="Поиск по сайту"
                                    ref={inputSearch}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                                    <SearchIcon sx={{ fontSize: "2.5rem" }} />
                                </IconButton>
                            </form>
                        </div>
                        <div className="header-link-cart">
                            <Link to="/cart">
                                <h1 className="category cart">
                                    <span className="cart-text">Корзина</span>
                                    <span className="cart-length"></span>
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: "29px" }}/>
                                </h1>
                            </Link>
                        </div>
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