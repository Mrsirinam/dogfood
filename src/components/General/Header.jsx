import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { 
					Folder2, 
					Star, 
					Cart4, 
					PersonSquare, 
					BoxArrowInRight 
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";

const Header = ({user, setModalActive, serverGoods}) => {
	const [likeCnt, setLikeCnt] = useState(0);
	const [cartCnt, setCartCnt] = useState(0);
	useEffect(() => {
		//фильтруем только те товары, у которых в лайках есть id нашего пользователя - id берем из ls, ибо мы про него забыли
		setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)
	}, [serverGoods]);

	const navigate  = useNavigate();
    const logIn = (e) => {
        e.preventDefault();
				// setUser("lk-band");
        // localStorage.setItem("rockUser", "lk-band");
				setModalActive(true);
				navigate("/profile")
    }
    return <header>
        <Logo/>
        <div className="search"></div>
        <nav className="header__menu">
            {/* Если пользователь === true */}
            {user && <>
								<Link to="/catalog" title="Каталог">
										<Folder2/>
								</Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
									<Star/>
									<span className="badge-item">{likeCnt}</span>
								</Link>
								<Link to="/" title="Корзина" className="badge-el">
										<Cart4/>
										<span className="badge-item">{cartCnt}</span>
								</Link>
                <Link to="/profile" title="Профиль">
										<PersonSquare/>
								</Link>
                      
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
							<BoxArrowInRight/>
							</a>}
        </nav>
    </header>
}

export default Header;