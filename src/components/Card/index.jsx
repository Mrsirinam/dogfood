import { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import { ArrowThroughHeart, ArrowThroughHeartFill, Percent } from "react-bootstrap-icons"

// {img, name, price} => props (props.img, props.name, props.price)
const Card = ({
	img, name, price, _id, discount, tags, likes, setServerGoods }) => {
	// проверка, есть ли ID пользователя в массиве с лайками товара
	const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem("rockId")));

	const updLike = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setIsLike(!isLike);
		const token = localStorage.getItem("rockToken");
		fetch(`https://api.react-learning.ru/products/likes/${_id}`, {
			method: isLike ? "DELETE" : "PUT",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				//изменить основной массив с товарами внутри реакт (на стороне клиента)
				// если внутри функции set....(useState) находится callback, то его аргументом является старое состояние (то, что было до его изменения) - в нашем случае мы его назвали old
				//callback обязательно должен вепнуть новые данные
				setServerGoods(function (old) {
					console.log(old);
					// нам надо из массива взять одну картоку и заменить ее. При этом , ни положение карточки в мссиве не должно поменяться. Наилучший способ пройтись по массиву, изменив чать его - это метод map
					const arr = old.map(el => {
						//для каждого элемента с товарами
						if (el._id === _id) { //если id товара является тем же, что и у измененного товара
							return data; //то я заменила товар в общем массиве на обновленный
						} else { //иначе
							return el; //ничего не делаю
						}
					});
					return arr //возвращаем новый массив
				})
			})
	}

	return <Link className="card" to={`/product/${_id}`}>
		{discount > 0 && <span className="card__discount"><Percent /> {discount}</span>}
		<span className="card__like" onClick={updLike}>
			{isLike ? <ArrowThroughHeartFill /> : <ArrowThroughHeart />}
		</span>
		{/* <img src={img} alt="Картинка" className="card__img"/> */}
		<span className="card__img2" style={{ backgroundImage: `url(${img})` }} />        <span className="card__name">{name}</span>
		<span className="card__price">
			{discount > 0
				? <>
					<del>{price}</del>
					&nbsp;
					{price * (100 - discount) / 100}
				</>
				: price
			}
			&nbsp;₽</span>
		<button className="card__btn">В корзину</button>
		<span className="card__tags">
			{tags.map(el => <span key={el}>{el}</span>)}
		</span>
	</Link>
}

export default Card;