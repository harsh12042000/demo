import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../Rating";
import LoadingBox from "../LoadingBox";
import { getError } from "../../utils";
import Store from '../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addTocartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${product._id}`);
    const response = await fetch(`/api/products/${product._id}`);
    const data = await response.json();
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity} })
    navigate('/cart');
  };

  return loading ? (
    <div><LoadingBox /></div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <>
        <section className="py-5">
          <div className="container">
            <div className="row gx-5">
              <div className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={process.env.PUBLIC_URL + product.image}
                  />
                </div>
              </div>
              <main className="col-lg-6">
                <h2>{product.name}</h2>
                <p></p>
                <p>{product.description}</p>
                <Rating rating={4} numReviews={20} />
                <p></p>
                <h4>
                  <strong>&#8377;{14036}</strong>
                </h4>
                <p></p>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Collections</th>
                      <th scope="col">Category</th>
                      <th scope="col">Count in Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.collections}</td>
                      <td>{product.category}</td>
                      <td>{product.countInStock}</td>
                    </tr>
                  </tbody>
                </table>
                <p></p>
                {product.countInStock > 0 ? <button className="btn btn-light" onClick={() => addTocartHandler()}>
                  Add to cart
                </button>
                  :
                  <div class="alert alert-danger" role="alert">
                    Sorry, out of Stock !
                  </div>}

              </main>
            </div>
          </div>
        </section>
        {/* content */}
        <section className="bg-light border-top py-4">
          <div className="container">
            <div className="row gx-4">
              <div>
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Similar items</h5>
                      <div className="d-flex mb-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default ProductScreen;
