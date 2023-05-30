import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"

//подключаем контекст
import Ctx from "./context";



// компоненты (кусочки кода, которые используются многократно)
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal"
import Search from "./components/Search";
// страницы - отдельный компонент со своим набором компонентов
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Add from "./pages/AddProduct"

const App = () => {
	// api новости
	// let key = "7f7747c7f46444109d662bcda004bd8d"
	"https://newsapi.org/v2/everything?q=собака&sources=lenta&apiKey=7f7747c7f46444109d662bcda004bd8d"
	const [user, setUser] = useState(localStorage.getItem("rockUser"));
	const [token, setToken] = useState(localStorage.getItem("rockToken"));
	const [userId, setUserId] = useState(localStorage.getItem("rockId"))

	//Поиск по сайту
	const [text, setText] = useState("")
	//товары из БД
	const [serverGoods, setServerGoods] = useState([]);
	//товары для поиска и фильтрации
	const [goods, setGoods] = useState(serverGoods);
	//получаем новости
	useEffect(() => {
		fetch("https://newsapi.org/v2/everything?q=собака&sources=lenta&apiKey=7f7747c7f46444109d662bcda004bd8d")
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setNews(data.articles)
			})
	}, [])

	const [news, setNews] = useState([]);

	const [modalActive, setModalActive] = useState(false);

	//useEffect  срабатывает когда компонент создался или перерисовался
	useEffect(() => {
		if (token) {
			fetch("https://api.react-learning.ru/products", {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("rockToken")}`
				}
			})
				.then(res => res.json())
				.then(data => {
					if (!data.err) {
						console.log(data);
						setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
					}
				})
		}
	}, [token])

	useEffect(() => {
		if (!goods.length) {
			console.log("=)");
			setGoods(serverGoods);
		}
	}, [serverGoods]);

	useEffect(() => {

		if (user) {
			setToken(localStorage.getItem("rockToken"));
			setUserId(localStorage.getItem("rockId"))
		} else {
			setToken("");
			setUserId("");
		}
		console.log("u", user);
	}, [user])

	return (
		<Ctx.Provider value={{
			goods: goods,
			setGoods,
			setServerGoods,
			news,
			text,
			setText,
			userId,
			token
		}}>
			<Header
				user={user}
				setModalActive={setModalActive}
				serverGoods={serverGoods}
			/>
			<main>
				<Search arr={serverGoods} />

				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/catalog" element={<Catalog

						//когда мы ставим лайк на оовар - его нужно обновить в общем массиве с товарами, иначе лайк поставится только в карточке, но после изменения страницы(переходе между страницами), мы его больше не увидим 
						setServerGoods={setServerGoods}
					/>} />
					<Route path="/add" element={<Add />} />
					<Route path="/favorites" element={<Favorites
						goods={goods}
						userId={userId}
						setServerGoods={setServerGoods}
					/>} />
					<Route path="/draft" element={<Draft />} />
					<Route path="/profile" element={
						<Profile user={user} setUser={setUser} color={"yellow"} />
					} />
					<Route path="/product/:id" element={<Product token={token} />} />
				</Routes>
			</main>
			<Footer />
			<Modal
				active={modalActive}
				setActive={setModalActive}
				setUser={setUser}
			/>
		</Ctx.Provider>


	)
}

export default App;









