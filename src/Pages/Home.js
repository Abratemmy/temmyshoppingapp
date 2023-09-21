import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import categories from '../categories';
import { LinkContainer } from 'react-router-bootstrap'
import banner from '../Assets/banner.JPG'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from "../axios"
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';


function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const lastProducts = products.slice(0, 8)

    useEffect(() => {
        axios.get('/products').then(({ data }) => dispatch(updateProducts(data)))
    }, []);

    return (
        <div>
            <div className='home-image'>
                <Container>
                    <div className='banner'>
                        <h1>Shopping made easier</h1>
                    </div>
                </Container>
            </div>

            <div className='featured-products-container container mt-4'>
                <h2>Last products</h2>
                {/* last products here */}
                <div className='d-flex justify-content-center flex-wrap'>
                    {lastProducts?.map((product) => {
                        return (
                            <ProductPreview {...product} />
                        )
                    })}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: 'right', display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
            </div>

            {/* sale banner */}
            <div className='sale_banner--container mt-4'>
                <img src={banner} alt="" />
            </div>
            <div className='recent-products--container container mt-4'>
                <h2>Categories</h2>
                <Row>
                    {categories.map((category, index) => {
                        return (
                            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`} key={index}>
                                <Col md={4}>
                                    <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`, gap: '10px' }} className="category-tile">
                                        {category.name}
                                        {/* <img src={category.img} alt="" width="100%" /> */}
                                    </div>
                                </Col>
                            </LinkContainer>
                        )
                    }

                    )}
                </Row>
            </div>

        </div>
    )
}

export default Home