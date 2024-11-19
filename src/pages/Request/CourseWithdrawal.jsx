//#region imports
import SortableTable from '@/components/SortableTable'
import Layout from '@/components/Layout';
import { Button, Col, Dropdown, Form, FormCheck, Row, Table, InputGroup, DatePicker } from "@govtechsg/sgds-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { getWithdrawalRequests } from "@/apis/workflowAPI";
import { toast } from "react-toastify";

//#endregion

export default function RequestList() {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);

  const [items, setItems] = useState([]);
  const [requestsList, setRequestsList] = useState([]);


    const getRequestsList = () => {
         getWithdrawalRequests()
            .then((response) => {
                console.log("Get requests list");
                setRequestsList(response?.data.data);
            })
            .catch((error) => {
                toast.error(error.response?.data.message);
            });
    };




  const [data, setData] = useState([
    {
      request_no: "CW_00098",
      adm_no: "T12334232A",
      student: "Alice Lim",
      request_date: "2024-09-30 1:59PM",
      workflow_status: "Pending Endorsement by CM/CC/PEM"
    },
  ]);

  const [requestsListHeader, setRequestsListHeader] = useState([
    { key: 'request_id', label: 'Request', width: '10%', sortable: true },
    { key: 'adm_no', label: 'Student Admission No.', width: '10%', sortable: true },
    { key: 'course_code', label: 'Course Code.', width: '10%', sortable: true },
    { key: '', label: 'Student', width: '40%', sortable: true },
    { key: 'created_date', label: 'Request Date', width: '10%', sortable: true },
    { key: '', label: 'Request Status', width: '20%', sortable: true },
  ]);



  const renderCellContent = (row, rowIndex, key) => (
    key === "request_id" ? (
      <a href={`/request/course-withdrawal-detail/${row[key]}`}>{row[key]}</a>
      
    ) : 
    (row[key])
  );


  useEffect(() => {
    getRequestsList();
}, []);


  return (
    <Layout currentNav={"request"}>
      <sgds-content-header-top>
        <h2>Course Withdrawal</h2>
      </sgds-content-header-top>
      <sgds-content-body>
        <div className="d-flex gap-4 flex-column">
          <div className={`p-3 bg-white shadow-sm border rounded border-1`}>
            <div className="row">
              <div className="col">
                <h5>Filter by:</h5>
              </div>
            </div>

            <Form
              ref={contentRef}
              className={` d-flex flex-column gap-3 collapse-animation`}
              style={{
                overflow: isOpen ? "unset" : "hidden",
                maxHeight: isOpen
                  ? `${contentRef?.current?.scrollHeight == null
                    ? "100%"
                    : contentRef?.current?.scrollHeight
                  }px`
                  : "0px",
              }}
              onSubmit={() => console.log("a")}
            >
              <Row>
                <Col xs={3}>
                  <Form.Group>
                    <Form.Label>Adm. No.</Form.Label>
                    <Select
                      options={[]}
                      placeholder={`Students`}
                    // onInputChange={setSearchStudent}
                    // onChange={(e) => {
                    //   setSelectedStudent(e);
                    //   setItems([]);
                    //   setRetrieve(false);
                    // }}
                    //value={selectedStudent}
                    />
                  </Form.Group>
                </Col>


                {/*<Col xs={3}>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label>Admission No.</Form.Label>*/}
                {/*        <Select options={options} />*/}
                {/*    </Form.Group>*/}
                {/*</Col>*/}
                {/* <Col xs={3}>
                                      <Form.Group>
                                        <Form.Label>ID No. </Form.Label>
                                        <Select options={options} />
                                      </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                      <Form.Group>
                                        <Form.Label>Study Stage</Form.Label>
                                        <Select options={options} />
                                      </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                      <Form.Group>
                                        <Form.Label>Study Status</Form.Label>
                                        <Select options={options} />
                                      </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                      <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Select options={options} />
                                      </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                      <Form.Group>
                                        <Form.Label>Course</Form.Label>
                                        <Select options={options} />
                                      </Form.Group>
                                    </Col> */}
              </Row>

              <Row>
                <Col xs={3}>
                  <Button
                    type="button"
                    className="btn btn-primary"
                  // onClick={() => {
                  //   handleGetListAwardType();
                  //   handleGetStudentDetail();
                  // }}
                  >
                    Retrieve
                  </Button>
                </Col>
              </Row>
            </Form>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-clear btn-link ps-0 mt-3 d-flex gap-2 align-items-center"
            >
              {isOpen ? "Hide " : "Expand "}{" "}
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
        <div className={`p-3 bg-white shadow-sm`}>
          <SortableTable headers={requestsListHeader} data={requestsList}
            renderCellContent={renderCellContent} setData={setRequestsList} />

        </div>

      </sgds-content-body>
    </Layout>
  )
}