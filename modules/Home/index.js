import React, { useEffect, useReducer } from "react";
import axios from 'axios';
import logger from 'use-reducer-logger';
import Hero from "../../components/Hero";
import Collections from "../../components/Home/collections";
import Testimonials from "../../components/Home/testimonials";
import Gallery from "../../components/Home/gallery";
import Product from "../../components/Products/product";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Home = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Hero />
            <div className="text-centre" style={{ margin: "100px 0 50px 0" }}>
                <h2>Popular Collections</h2>
                <img src={process.env.PUBLIC_URL + '/assets/images/line_star.png'}></img>
            </div>
            <Collections />
            <div className="text-centre" style={{ margin: "100px 0 50px 0" }}>
                <h2>Featured Products</h2>
                <img src={process.env.PUBLIC_URL + '/assets/images/line_star.png'}></img>
            </div>
            {/* <Featured/> */}
            {/* <Products/> */}
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3" key={product.slug}>
                            <Product product={product}></Product>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-centre" style={{ margin: "100px 0 50px 0" }}>
                <h2>Love from our Customers</h2>
                <p>Explore what are customers have to say about our collections!</p>
                <img src={process.env.PUBLIC_URL + '/assets/images/line_star.png'}></img>
            </div>
            <Testimonials />
            <div className="text-centre" style={{ margin: "100px 0 50px 0" }}>
                <h2>Produts Gallery</h2>
                <img src={process.env.PUBLIC_URL + '/assets/images/line_star.png'}></img>
            </div>
            <Gallery />
        </>
    )
}

export default Home

