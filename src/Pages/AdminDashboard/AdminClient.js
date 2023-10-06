import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import Loading from '../../components/Loading';
import { Table } from 'react-bootstrap';

function AdminClient() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUser(data)
            })
            .catch((e) => {
                setLoading(false);
                console.log(e)
            })
    }, [])

    if (loading) return <Loading />;
    if (user?.length === 0) return <h2 className='py-2 text-center'>No Users yet</h2>


    return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Client Id#</th>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>Date</th>


                    </tr>
                </thead>
                <tbody>
                    {user?.map((user, index) => (
                        <tr key={index}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AdminClient