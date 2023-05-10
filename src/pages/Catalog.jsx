import Card from "../components/Card"
const Catalog = ({goods})=> {
	return <div className="container">
	{goods.map(g => <Card key={g._id} {...g} img={g.pictures}/>)} 
	{/* //id из бд приходит с нижним подчеркиванием */}
	</div>
}

export default Catalog