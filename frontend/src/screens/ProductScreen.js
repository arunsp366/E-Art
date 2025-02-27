import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loading from '../components/Loader'
import ErrorMessage from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({  history, match }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
        </Link>
        {loading ? <Loading /> : error ? <ErrorMessage variant='danger' >{error}</ErrorMessage> :
        (
            <Row>
                <Col md={6}>
                    <Image width={'100%'} height={'100%'}  src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup Varient='flush'>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong> ${product.price} </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                               </Col>

                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                       <Col>Qty</Col>
                                       <Col>
                                       <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}
                                       >
                                           {
                                           [...Array(product.countInStock).keys()].map((x) => (
                                               <option key={x + 1} value={x+1}>
                                                   {x+1}
                                               </option>
                                           ))}

                                       </Form.Control>
                                       </Col> 
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <div>
                               <Button 
                                 onClick={addToCartHandler}
                                 className='btn-block'style={{margin:10}} type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </div>
                                  
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        )
        }
        </>
    )
}

export default ProductScreen

