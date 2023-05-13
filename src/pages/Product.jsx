import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const Product = ({ token }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

	
  /*
	product?.name 
	=
	product && product.name
	*/

  useEffect(() => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, []);
  return (
    <>
      {product.name ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.pictures} alt={product.name} />
          <mark>{product.price}₽</mark>
        </>
      ) : (
        <Loader />
      )}

      {/* <h1>
		{product.name ? product.name : "Страница одного товара"}
		</h1>
	{product.pictures && <img src ={product.pictures} alt={product.name}></img>}
	{product.price && <mark>{product.price}₽</mark>} */}
    </>
  );
};

export default Product;
