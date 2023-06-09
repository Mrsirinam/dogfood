import Logo from "./Logo";
import { Link } from "react-router-dom";
import Draft from "../../pages/Draft";

const Footer = () => {
	return <footer>
		<div className="footer__cell">
			<Logo />
			<div style={{ padding: "15px" }}>©{new Date().getFullYear()}</div>
		</div>
		<div className="footer__cell footer__menu">
			<Link style={{ padding: "15px" }} to="">Каталог</Link>
			<Link style={{ padding: "15px" }} to="">Избранное</Link>
			<Link style={{ padding: "15px" }} to="">Корзина</Link>
			<Link style={{ padding: "15px" }} to="/draft">Черновик</Link>

		</div>
	</footer>
}

export default Footer;