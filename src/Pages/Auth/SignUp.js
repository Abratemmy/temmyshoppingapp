import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Auth.css';
import { useSignupMutation } from '../../services/appApi';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")


    const [signup, { error, isLoading, isError }] = useSignupMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        signup({ name, email, password })
    }
    return (
        <div className='authWrapper'>
            <Container>
                <Row>
                    <Col md={6} className="auth__form--container">
                        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <h1>Create an account</h1>
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <Form.Group className='mb-3'>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder='Enter your fullname' value={name} required onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder='Enter email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder='Enter Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Button type="submit" disabled={isLoading}>Create account </Button>
                            </Form.Group>

                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </Form>
                    </Col>

                    <Col md={6} className='signup__image--container'>

                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Signup