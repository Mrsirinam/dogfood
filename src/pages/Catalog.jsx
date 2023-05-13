import Card from "../components/Card";
import { useState } from "react";

const Catalog = ({ goods, setServerGoods }) => {
	const [sort, setSort] = useState(null);
	const filtersSt = {
		gridColumnEnd: "span 4",
		display: "flex",
		gap: "20px",
	};
	const sortHandler = (vector) => {
		if (vector === sort) {
			setSort(null);
			// setServerGoods((old) => [...old]);
			goods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

		} else {
			setSort(vector);
			goods.sort((a, b) => {
				return vector === "up" ? a.price - b.price : b.price - a.price;
			});
		}
	};
	return (
		<div className="container">
			<div style={filtersSt}>
				{/* сортировка по числу price */}
				<button
					style={{ backgroundColor: sort === "up" ? "orange" : "white" }}
					onClick={() => sortHandler("up")}
				>По возрастанию цены
				</button>
				<button
					style={{ backgroundColor: sort === "down" ? "orange" : "white" }}
					onClick={() => sortHandler("down")}
				>По убыванию цены
				</button>
				{/* фильтрация */}
				<button>Новинки</button>
				<button>Скидки</button>
			</div>

			{goods.map((g) => (
				<Card
					key={g._id}
					{...g}
					img={g.pictures}
					setServerGoods={setServerGoods}
				/>
			))}
			{/* //id из бд приходит с нижним подчеркиванием */}
		</div>
	);
};

export default Catalog;
