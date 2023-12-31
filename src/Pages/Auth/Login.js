import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../services/appApi';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [login, { error, isLoading, isError }] = useLoginMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password })
    }

    return (
        <div className='authWrapper'>
            <Container>
                <Row>
                    <Col md={6} className="auth__form--container">
                        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <h1>Login to your account</h1>
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder='Enter email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder='Enter Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Button type="submit" disabled={isLoading}>Login </Button>
                            </Form.Group>

                            <p>Don't have an account? <Link to="/signup">Create account</Link></p>
                        </Form>
                    </Col>
                    <Col md={6} className='login__image--container'>

                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Login