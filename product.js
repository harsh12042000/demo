import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Rating from '../Rating';
import axios from 'axios';
import { useContext } from 'react';
import Store from '../../Store';

function Product(props) {
  const { product } = props;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${item._id}`);
    const response = await fetch(`/api/products/${product._id}`);
    const data = await response.json();
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    navigate('/cart');
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <h6>{product.name}</h6>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <h4>${product.price}</h4>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} className='btn-light'>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;