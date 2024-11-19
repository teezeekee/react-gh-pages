import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout'
import { Accordion } from "@govtechsg/sgds-react/Accordion";
import { Button, Col, Dropdown, Form, FormCheck, Row, Table, InputGroup, DatePicker, Modal, Stepper, TableBody, TableHeader, TableDataCell } from "@govtechsg/sgds-react";
import { getWithdrawalRequestById } from "@/apis/workflowAPI";


export default function CourseWithdrawalDetail() {
    const { reqid } = useParams();
    console.log(reqid);

    const [request, setRequest] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWithdrawalRequestById(reqid);
                console.log("1", response.data?.data);
                setRequest(response.data?.data); // Bind the response data to state
            } catch (error) {
                console.error("Error fetching withdrawal request:", error);
            }
        };

        fetchData();
    }, [reqid]);


    const studname = "Alice Lim";
    const studAdmNo = "T1234242F";
    const [show, setShow] = useState(false);

    const onSubmit = event => {
        event.preventDefault();
        console.log('submission prevented');
    };

    const milestones = [
        'Submitted',
        'Under Review',
        'Approved',
        'Rejected',
    ];

    return (
        <Layout currentNav={"request"}>
            <sgds-content-header-top>
                <h2>Course Withdrawal for {studname} ({request.adm_no})</h2>
            </sgds-content-header-top>
            <sgds-content-body>
                <section className="shadow rounded p-5" >
                    <Col sm={12}>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <div>xxx@nyp.edu.sg</div>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Label>Contact No.</Form.Label>
                                <div>{request.adm_no}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Label>Course</Form.Label>
                                <div>{request.course_code}</div>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Label>Sponsor (if any)</Form.Label>
                                <div>-</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Label>Withdrawal Reason Code</Form.Label>
                                <div>{request.withdrawal_reason}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className="mb-3">
                                <Form.Label>Remarks (if any)</Form.Label>
                                <div>{request.remarks === null ? "-" : request.remarks}</div>
                            </Col>
                        </Row>
                    </Col>
                </section>
                <section className="shadow rounded p-5 mt-5" >
                    <Col sm={11}>
                        <h4 className={`text-blue fw-bold`}>Reviewer Milestones</h4>
                        <Table>
                            <TableHeader></TableHeader>
                            <TableBody>
                                <Table.Row>
                                    <TableDataCell xs={12} md={6}><Form.Label>Submitted</Form.Label></TableDataCell>
                                    <TableDataCell xs={12} md={6}>
                                        {studname} on 2024-09-30 1:59PM
                                    </TableDataCell>
                                </Table.Row>
                                <Table.Row>
                                    <TableDataCell><Form.Label>Endoser (Couse Manager/ Course Coordinator/ PEM)</Form.Label> </TableDataCell>
                                    <TableDataCell>Gary on 2024-09-30 1:59PM
                                        <Col className="mb-3">
                                            <Form.Label>Remarks: </Form.Label>
                                            <div>We work as a team, and individually, to grow each and every day that we are in business together. It is our company philosophy that we share our responsibilities as a group, allowing each of us to contribute in a way that is sensible to his or her talents and ambitions. </div>
                                        </Col>
                                    </TableDataCell>
                                </Table.Row>
                                <Table.Row>
                                    <TableDataCell><Form.Label>School General Administration Office acknowledgement</Form.Label> </TableDataCell>
                                    <TableDataCell>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                //  setItems([item]);
                                                setShow(true);
                                            }}
                                        >
                                            Pending for your action
                                        </button></TableDataCell>
                                </Table.Row>
                                <Table.Row>
                                    <TableDataCell> <Form.Label>Library Acknowledgement</Form.Label></TableDataCell>
                                    <TableDataCell>- </TableDataCell>
                                </Table.Row>
                            </TableBody>
                        </Table>



                        <button
                            className={`btn-clear`}
                            onClick={() => {
                                //  setItems([item]);
                                setShow(true);
                            }}
                        >
                            <i className={`bi bi-pencil`}></i>
                        </button>

                    </Col>



                </section>




                <Modal
                    size={"lg"}
                    show={show}
                    onHide={() => setShow(false)}
                    centered={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Action - add remarks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className={`justify-content-center`}>
                            <Col xs={8} className={`bg-yellow-100 p-2 text-center`}>
                                Selected{" "}
                                <span className={`fw-bold`}>
                                    {studname} ({request.adm_no})    </span>
                            </Col>
                        </Row>

                        <Row className={`flex-column mt-3`}>
                            <h5 className={`fw-bold`}>Application Status</h5>

                            <Col>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="statusRad"
                                        id="optionRad1"
                                    /*checked={addRemarks?.appln_status === "A"}
                                   onChange={() =>
                                        setAddRemarks((prevState) => ({
                                            ...prevState,
                                            appln_status: "A",
                                        }))
                                    }*/
                                    />
                                    <label className="form-check-label" htmlFor="optionRad1">
                                        Approve
                                    </label>
                                </div>
                            </Col>

                            <Col>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="statusRad"
                                        id="optionRad2"
                                    /* checked={addRemarks?.appln_status === "E"}
                                   onChange={() =>
                                        setAddRemarks((prevState) => ({
                                            ...prevState,
                                            appln_status: "E",
                                        }))
                                    }*/
                                    />
                                    <label className="form-check-label" htmlFor="optionRad2">
                                        Reject
                                    </label>
                                </div>
                            </Col>
                        </Row>

                        <div className={`d-flex flex-column gap-3 mt-3`}>
                            <h5 className={`fw-bold mb-0`}>Add remarks</h5>

                            <Row>
                                <Col xs={4}>
                                    <label>Approval Status Remarks</label>
                                </Col>
                                <Col xs={8}>
                                    <Form.Control
                                        type={"text"}
                                    /* onChange={(e) =>
                                         setAddRemarks((prevState) => ({
                                             ...prevState,
                                             remarks1: e?.target?.value,
                                         }))
                                     }
                                     value={addRemarks?.remarks1}*/
                                    ></Form.Control>
                                </Col>
                            </Row>

                        </div>
                    </Modal.Body>
                    <Modal.Footer className={`gap-2`}>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" /*onClick={handleAddRemarks}*/>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>




            </sgds-content-body>
        </Layout>
    )
}
