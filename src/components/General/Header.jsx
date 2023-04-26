import Logo from "./Logo";

const Header = ({user, setUser}) => {
	
    const logOut = (e) => {
        e.preventDefault();
				setUser("")  //можно setUser(null) 
        localStorage.removeItem("rockUser");
    }
    const logIn = (e) => {
        e.preventDefault();
				setUser("lk-band");
        localStorage.setItem("rockUser", "lk-band");
    }
    return <header>
        <Logo/>
        <div className="search"></div>
        <nav className="header__menu">
            {/* Если пользователь === true */}
            {user && <>
                <a href="">Избранное</a>
                <a href="">Корзина</a>
                <a href="">Профиль</a>
                <a href="" onClick={logOut}>Выйти</a>
            </>}
            {!user && <a href="" onClick={logIn}>Войти</a>}
        </nav>
    </header>
}

export default Header;