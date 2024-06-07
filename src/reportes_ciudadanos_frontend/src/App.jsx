import { useEffect, useState } from 'react';
import { reportes_ciudadanos_backend } from 'declarations/reportes_ciudadanos_backend';
import { Container, Row, Col, Card, Table, Button, Modal, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import FormReport from './FormReport';

function App() {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({});
  const [show, setShow]  = useState(false);

  const navigate = useNavigate()
  useEffect(() =>  {
      getReports();
  }, [])

  function getReports() {
    Swal.fire("Cargando reportes, por favor espere...");
    Swal.showLoading();
    reportes_ciudadanos_backend.getAllReports().then(reports => {
      setReports(reports);
      Swal.close();
    });
  }

  function getReport(id) {
    Swal.fire("Cargando reporte, por favor espere...");
    Swal.showLoading();
    reportes_ciudadanos_backend.getReportById(BigInt(id)).then(report =>{
      setReport(report.shift());
      Swal.close();
      setShow(true)
    });
  }

  function deleteReport(id) {
    Swal.fire("Eliminando reporte, por favor espere...");
    Swal.showLoading();
    reportes_ciudadanos_backend.deleteReport(BigInt(id)).then(() =>{
      getReports();
    });
  }

  return (
    <Container fluid style={{ backgroundColor: '#7DDA58', minHeight: '100vh' }}>
      <Row className='m-5'>
        <Card>
          <Card.Body>
            <Row className='m-3'>
              <Col>
                <Card.Title>Reportes de los ciudadanos</Card.Title>
              </Col>
              <Col>
                <Button variant="primary" onClick={()=>navigate('/crear-reporte')}>Agregar Reporte</Button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Ubicacion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  reports.length > 0 ?
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td>{Number(report.id)}</td>
                      <td>{report.title}</td>
                      <td>{report.description}</td>
                      <td>{report.ubication}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button variant='warning' onClick={() => getReport(Number(report.id))}>Editar</Button>
                          </Col>
                          <Col>
                            <Button variant='danger' onClick={() => deleteReport(Number(report.id))}>Eliminar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                  : <tr><td colSpan="5">No hay reportes disponibles</td></tr>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormReport
            id={Number(report.id)}
            rTitle={report.title}
            rDescription={report.description}
            rUbication={report.ubication}
            isEditable={true}
            getReports={getReports}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
