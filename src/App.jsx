import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"

// компоненты (кусочки кода, которые используются многократно)
import {Header, Footer} from "./components/General";
import 	Modal from "./components/Modal"
import Search from "./components/Search";
// страницы - отдельный компонент со своим набором компонентов
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
		const [token, setToken] = useState(localStorage.getItem("rockToken"));
		//товары из БД
		const [serverGoods, setServerGoods] = useState([]);
		//товары для поиска и фильтрации
		const [goods, setGoods] = useState(serverGoods);

		const [modalActive, setModalActive] = useState(false);

		//useEffect  срабатывает когда компонент создался или перерисовался
		useEffect(() => {
			if (token) {
			fetch("https://api.react-learning.ru/products",	{
				headers: {
						"Authorization": `Bearer ${localStorage.getItem("rockToken")}`
			}
		})
						.then(res => res.json())		
						.then(data => {
							if (!data.err) {
							console.log(data);
							setServerGoods(data.products)
							}
						})
					}
				}, [token])

				useEffect(() => {
					setGoods(serverGoods);
				}, [serverGoods]);
			
			useEffect(() => {
				if (user) {
				setToken(localStorage.getItem("rockToken"));
			} else {
				setToken("")
			}
				console.log("u", user);
				console.log("t", token);
		}, [user])

    return (
		<>
        <Header 
				user={user} 
				setModalActive={setModalActive}
				/>
       <main>	
				<Search arr={serverGoods} upd={setGoods}/>
			
					<Routes>
							<Route path="/" element={<Main/>} />
							<Route path="/catalog"  element={<Catalog goods={goods}/>} />
							<Route path="/draft"  element={<Draft/>} />
							<Route path="/profile"  element={
									<Profile user={user} setUser={setUser} color={"yellow"}/>
							} />
							<Route path="/product/:id" element={<Product token ={token}/>}/>
					</Routes>
			 </main>
        <Footer/>
				<Modal 
				active={modalActive} 
				setActive={setModalActive}
				setUser={setUser}
				/>


    </>
		)
}

export default App;









