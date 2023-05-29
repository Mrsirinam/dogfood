import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Add = () => {
	return <Container className="bs">
		<Row>
			<Col xs={12}>
				<h1>Добавить товар</h1>
			</Col>
		</Row>
		<Form>
			<Row>
				<Col xs={12} sm={6}></Col>
				<Col xs={12} sm={6}></Col>
			</Row>
		</Form>

	</Container>
}

export default Add;