import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation } from '../../services/appApi';
import { Alert, Button, Col, Container, Form, Row, } from "react-bootstrap"
import axios from '../../axios';
import categories from '../../categories';

function EditProductPage() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    const navigate = useNavigate()
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation()

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'hayteetech',
                uploadPreset: 'ilawqlzk',
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
                console.log("IMAGE", result)
            }

        );
        widget.open();
    }

    // remove image from list before submitting
    // from the frontend, the cloudinary widget is uploading the selected images on the cloudinay
    // so if we want to remove it, We write line of code at the backend to remove the image from cloudinary
    const handleRemoveImg = (imgObj) => {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields")
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate('/admin')
                }, 1500)
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1>Edit Product</h1>
                        {isSuccess && <Alert variant="success">Product updated with success </Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className='mb-3'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder='Enter product name' value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" placeholder='Enter product description' value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label> Price ($)</Form.Label>
                            <Form.Control type="number" placeholder='Enter product price' value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>


                        <Form.Group className='mb-3' onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select value={category}>
                                <option disabled selected>
                                    --Select One ---
                                </option>
                                {categories.map((category, index) => {
                                    return (
                                        <option value={category.name.toLocaleLowerCase()} key={index} style={{ textTransform: 'capitalize' }}>{category.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className='mb-3'>
                            <Button type="button" onClick={showWidget}>Upload Images</Button>
                            <div className='images-preview-container'>
                                {images.map((image) => (
                                    <div className='image-preview'>
                                        <img src={image.url} alt="" />
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Button type="submit" disabled={isLoading || isSuccess}>Update Product </Button>
                        </Form.Group>

                        {/* <p>Don't have an account? <Link to="/signup">Create account</Link></p> */}
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container">

                </Col>
            </Row>
        </Container>
    )
}

export default EditProductPage