import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { 
					Folder2, 
					Star, 
					Cart4, 
					PersonSquare, 
					BoxArrowInRight 
} from "react-bootstrap-icons"

const Header = ({user, setModalActive}) => {
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
                <Link to="/" title="Корзина">
										<Cart4/>
								</Link>
                <Link to="/profile" title="Профиль">
										<PersonSquare/>
								</Link>
                <Link to="/" title="Избранное">
										<Star/>
								</Link>
              
            </>}
            {!user && <a href="" onClick={logIn}title="Войти">
							<BoxArrowInRight/>
							</a>}
        </nav>
    </header>
}

export default Header;