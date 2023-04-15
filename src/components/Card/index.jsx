import "./style.css";

// {img, name, price} => props (props.img, props.name, props.price)
const Card = ({img, name, price}) => {
    return <a className="card" href="">
        <img src={img} alt="Картинка" className="card__img"/>
        <span className="card__name">{name}</span>
        <span className="card__price">{price} ₽</span>
        <button className="card__btn">В корзину</button>
    </a>
}

export default Card;