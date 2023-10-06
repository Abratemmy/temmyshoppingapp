import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../services/appApi';


function DashboardProducts() {
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.user);
    const [deleteProduct, { isLoading, isSuccess, isError }] = useDeleteProductMutation()

    // // removing the product
    // function handleDeleteProduct(id) {
    //     if(window)
    // }
    return (
        <div>
            {isError && (<>
                <h1>Product  not deleted </h1>
            </>)}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <tr>
                        <td>
                            <img src={product.pictures[0].url} className='dashboard-product-preview' alt="" />
                        </td>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <Button onClick={() => deleteProduct({ product_id: product._id, user_id: user._id })} disabled={isLoading}>Delete</Button>
                            <Link to={`/product/${product._id}/edit`} className='btn btn-warning'>Edit</Link>
                        </td>

                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default DashboardProducts