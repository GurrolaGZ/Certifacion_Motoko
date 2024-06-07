import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { reportes_ciudadanos_backend } from 'declarations/reportes_ciudadanos_backend';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const FormReport = ({
    id = null,
    rTitle = "",
    rDescription = "",
    rUbication = "",
    isEditable = false,
    getReports = () => { },
    setShow = () => { }
}) => {
    const [title, setTitle] = useState(rTitle);
    const [description, setDescription] = useState(rDescription);
    const [ubication, setUbication] = useState(rUbication);

    const navigate = useNavigate();

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeUbication = (e) => {
        setUbication(e.target.value);
    };

    const createReport = (e) => {
        e.preventDefault();
        Swal.fire("Guardando reporte, por favor espere...");
        Swal.showLoading();
        reportes_ciudadanos_backend.addReport(title, description, ubication).then(() => {
            Swal.fire({
                icon: "success",
                title: "Reporte Guardado con éxito",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                getReports();
                navigate('/');
            });
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Lo sentimos, ocurrió un error!",
            });
            console.log("Error al intentar crear reporte", err);
        });
    };

    const updateReport = (e) => {
        e.preventDefault();
        if (id === null) {
            Swal.fire({
                icon: "error",
                title: "ID no válido!",
            });
            return;
        }
        Swal.fire("Actualizando reporte, por favor espere...");
        Swal.showLoading();
        reportes_ciudadanos_backend.updateReport(BigInt(id), title, description, ubication).then(() => {
            Swal.fire({
                icon: "success",
                title: "Reporte Actualizado con éxito",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setShow(false);
                getReports();
            });
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Lo sentimos, ocurrió un error!",
            });
            console.log("Error al intentar actualizar reporte", err);
        });
    };

    return (
        <Container className='m-5' style={{ backgroundColor: '#7DDA58', minHeight: '100vh' }}>
            <Card className='w-50' style={{ margin: 'auto' }}>
                <Card.Body>
                    <Card.Title>{isEditable ? "Editar" : "Agregar"} Reporte</Card.Title>
                    <Form className='w-50' style={{ margin: 'auto' }} onSubmit={isEditable ? updateReport : createReport}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa el título del reporte:</Form.Label>
                            <Form.Control
                                value={title}
                                name="title"
                                onChange={onChangeTitle}
                                type="text"
                                placeholder="Ingresa título"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa el motivo del reporte:</Form.Label>
                            <Form.Control
                                value={description}
                                name="description"
                                onChange={onChangeDescription}
                                as="textarea"
                                placeholder="Ingresa el motivo"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa la ubicación del reporte:</Form.Label>
                            <Form.Control
                                value={ubication}
                                name="ubication"
                                onChange={onChangeUbication}
                                type="text"
                                placeholder="Ingresa la ubicación"
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    {isEditable ? "Editar" : "Guardar"} reporte
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

FormReport.propTypes = {
    id: PropTypes.string,
    rTitle: PropTypes.string,
    rDescription: PropTypes.string,
    rUbication: PropTypes.string,
    isEditable: PropTypes.bool,
    getReports: PropTypes.func,
    setShow: PropTypes.func
};

export default FormReport;
