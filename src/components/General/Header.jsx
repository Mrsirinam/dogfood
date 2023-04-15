import Logo from "./Logo";

const Header = ({user}) => {
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("rockUser");
    }
    const logIn = (e) => {
        e.preventDefault();
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