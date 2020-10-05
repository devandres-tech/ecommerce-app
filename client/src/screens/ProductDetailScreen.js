import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails } from '../actions/productAction'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
  const [quantity, setQuantity] = useState(0)
  const productId = match.params.id
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch])


  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {
        loading ? <Loader />
          : error
            ? <Message variant="danger">{error}</Message>
            : (<Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
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
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {
                            product.countInStock > 0 ?
                              "in Stock" : "Out of Stock"
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {
                      product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Quantity</Col>
                            <Col>
                              <Form.Control
                                onChange={(event) => setQuantity(event.target.value)}
                                as="select"
                                value={quantity}
                              >

                                {[...Array(product.countInStock).keys()].map(itemNumber => (
                                  <option key={itemNumber + 1} value={itemNumber + 1}>
                                    {itemNumber + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    }
                    <ListGroup.Item>
                      <Button
                        disabled={product.countInStock === 0}
                        className="btn-block"
                        type="button"
                      >
                        Add To Cart
                </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>)
      }
    </>
  )
}

export default ProductScreen