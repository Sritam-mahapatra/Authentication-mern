import React, { useState } from "react";
import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);  
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");  
                setUsername(formData.username);   
                localStorage.setItem("token", data.token);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Login failed");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Row>
                <Col md={12}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h3 className="text-center mb-4">Login</h3>

                            {message && (
                                <Alert variant="success">
                                    {message} <br />
                                    <strong>Hello, {username}!</strong>
                                </Alert>
                            )}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
