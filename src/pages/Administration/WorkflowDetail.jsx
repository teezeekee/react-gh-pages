import { Button, Col, Dropdown, Form, FormCheck, Row, Table, InputGroup, Accordion } from "@govtechsg/sgds-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SortableTable from "@/components/SortableTable";
import { toast } from "react-toastify";
import { getWorkflowById, postWorkflow } from "@/apis/workflowAPI";
import { getWorkflowStage } from "@/apis/workflowStageAPI";

export default function WorkflowDetail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams(); // useSearchParams hook
  const workflowidParams = searchParams.get("wfid");

  const [workflow_id, setWorkflowID] = useState('');
  const [formMode, setFormMode] = useState(workflowidParams != null ? "edit" : "add");
  const [workflowDetail, setWorkflowDetail] = useState({});
  const [dataWorkflowStages, setDataWorkflowStages] = useState([]);
  const [dataWorkflowStageFlows, setDataWorkflowStageFlows] = useState([]);
  const [stageShowhide, setStageShowhide] = useState(false);



  const backToListPage = () => {
    navigate("/administration/workflow-list");
  }

  const handleSubmit = event => {
    const workflowData = {
      wf_name: workflowDetail.wf_name,
      wf_code: workflowDetail.wf_code,
      wf_description: workflowDetail.wf_description,
      wf_status: workflowDetail.wf_status,
      wf_active_date: workflowDetail.wf_active_date ? moment(workflowDetail.wf_active_date).format("YYYY-MM-DD HH:mm:ss") : null,
      wf_inactive_date: workflowDetail.wf_inactive_date ? moment(workflowDetail.wf_inactive_date).format("YYYY-MM-DD HH:mm:ss") : null,
      created_by: "zk",
      updated_by: "zk",
    };

    console.log("workflowData", workflowData);

    if (!workflowData.wf_name || !workflowData.wf_code || !workflowData.wf_active_date) {
      toast.error("Please fill out the required fields");
      return;
    }

    postWorkflow(workflowData)
      .then((response) => {

        console.log("response", response);
        if (response?.response?.data?.message) {
          if (
            response?.response?.data?.message?.length > 0 &&
            Array.isArray(response?.response?.data?.message)
          ) {
            response?.response?.data?.message?.map((contentErr) => {
              toast.error(contentErr?.msg);
            });
          } else {
            toast.error(response?.response?.data?.message);
          }
        } else if (response?.response?.status === 404) {
          toast.error("Data not found");
        } else {
          toast.success(`Workflow "${response?.data?.data.wf_name}" created successfully. Please proceed to add in the process flow. `);

          setStageShowhide(true);
          setFormMode("edit");
          setWorkflowID(response?.data?.data.wf_guid);
          navigate(`/administration/workflow-detail?wfid=${response?.data?.data.wf_guid}`);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error.response?.data.message);
      });
  };

  const getWorkFlowDetail = () => {
    getWorkflowById(workflow_id)
      .then((resp) => {
        if (resp.status === 200 && resp.data) {
          setWorkflowDetail(resp?.data.data);

          console.log(resp?.data.data);
          //setDataWorkflowStages(resp?.data.data?.workflowstage);

          const workflowStages = resp?.data.data?.workflowstage;
          setDataWorkflowStages(workflowStages);
          /* setDataWorkflowStageFlows(workflowStages.map(stage => stage.workflowstageflow).flat());
             const updatedWorkflowStages = workflowStages.map(stage => {
             const stageFlows = stage.workflowstageflow.map(flow => {
               const relatedStage = workflowStages.find(s => s.wf_stage_guid === flow.on_success_stage_id || s.stage_code === flow.on_failure_stage_id);
 
               const stageName = workflowStages.find(s => s.stage_code === flow.stage_code);
               const sucessStage = workflowStages.find(s => s.wf_stage_guid === flow.on_success_stage_id);
               const failureStage = workflowStages.find(s => s.wf_stage_guid === flow.on_failure_stage_id);
               return {
               ...flow,
               stage_name: stageName ? stageName.stage_name : null,
               onSuccess_stage_name: sucessStage ? sucessStage.stage_name : null,
               onFailure_stage_name: failureStage ? failureStage.stage_name : null
 
               };
             });
             return {
               ...stage,
               workflowstageflow: stageFlows
             };
             });
 
             setDataWorkflowStages(updatedWorkflowStages);
             setDataWorkflowStageFlows(updatedWorkflowStages.map(stage => stage.workflowstageflow).flat());
 
 
             console.log("updatedWorkflowStages", updatedWorkflowStages);
 */



        }
      }).catch((error) => {
        toast.error(error.resp?.data.message);
      });
  };

  const [data, setData] = useState([
    {
      stage_name: "Requestor",
      stage_sequence: "1",
      stage_description: "Requestor submit request"
    },
  ]);


  const [header, setHeader] = useState([
    { key: 'stage_code', label: 'Stage Code', required: true, width: '20%', sortable: false },
    { key: 'stage_name', label: 'Stage Name', required: true, width: '20%', sortable: false },
    { key: 'stage_description', label: 'Stage Description', required: false, width: '50%', sortable: false },
    { key: 'stage_sequence', label: 'Stage Sequence', required: true, width: '20%', sortable: true },
    { key: 'is_parallel', label: 'Parallel Run?', required: true, width: '20%', sortable: true },
    { key: 'sla_duration', label: 'Duration to Complete', required: true, width: '20%', sortable: true },
    /*  { key: 'stage_sequence', label: 'Stage Sequence', required: true, width: '20%', sortable: true },
     { key: 'is_parallel', label: 'Parallel Run?', required: true, width: '20%', sortable: true },
     { key: 'on_success_stage_id', label: 'On Success', required: true, width: '20%', sortable: true },
     { key: 'on_failure_stage_id', label: 'On Failure', required: true, width: '20%', sortable: true },
     { key: 'sla_duration', label: 'Duration to Complete', required: true, width: '20%', sortable: true }, */
    { key: 'action', label: '', required: false, width: '10%', sortable: false },
  ]);

  const [workflowstageflowheader, setWorkflowStageFlowHeader] = useState([
    { key: 'stage_name', label: 'Stage Name', required: true, width: '20%', sortable: false },
    { key: 'stage_sequence', label: 'Stage Sequence', required: true, width: '20%', sortable: true },
    { key: 'is_parallel', label: 'Parallel Run?', required: true, width: '20%', sortable: true },
    { key: 'onSuccess_stage_name', label: 'On Success', required: true, width: '20%', sortable: true },
    { key: 'onFailure_stage_name', label: 'On Failure', required: true, width: '20%', sortable: true },
    { key: 'sla_duration', label: 'Duration to Complete', required: true, width: '20%', sortable: true },
    { key: 'action', label: '', required: false, width: '10%', sortable: false },
  ]);

  const [editArr, setEditArr] = useState([true]);

  const [show, setShow] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");


  const handleAddRow = () => {
    if (editArr.some((edit) => edit === false)) {
      toast.error("Save changes before editing another row");

      return false;
    }

    setData((prevArr) => {
      const newObj = {
        stage_name: "",
        stage_sequence: "",
        stage_description: ""
      };

      return [newObj, ...prevArr];
    });

    setEditArr((prevEditArr) => {
      return [false, ...prevEditArr];
    });

    setIsEditing(true);
  };

  const renderActionButtons = (row, rowIndex) => (
    <div className={`d-flex gap-1`}>
      {!editArr[rowIndex] ? (
        <div className={`d-flex gap-1`}>
          <button
            className={`btn-clear text-green-500`}
            onClick={() => handleSubmitEdit(rowIndex, row.id)}
          >
            <i className={`bi bi-check-lg`}></i>
            Save
          </button>

          <button
            className={`btn-clear text-red-500`}
            onClick={() => handleCancelEdit(rowIndex)}
          >
            <i className={`bi bi-x-circle`}></i>
            {` `}
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`btn-clear`}
          disabled={isEditing}
          onClick={() => handleEdit(rowIndex)}
        >
          <i className={`bi bi-pencil`}></i>
          {` `}
          Edit
        </button>
      )}

      <button
        className={`btn-clear`}
        disabled={rowIndex === 0 ? row?.id ? isEditing : false : isEditing}
        onClick={() => {
          setShow(true);
          setSelectedId(row.id ?? "");
          setSelectedIndex(rowIndex);
        }}
      >
        <i className={`bi bi-trash`}></i>
      </button>
    </div>
  );

  const renderCellContent = (row, rowIndex, key) => (
    key === "stage_description" ? editArr[rowIndex] ? (
      <textarea rows="5" width="100%"
        type={"text"}
        value={row[key]}
        onChange={(e) => handleCellContentChange(rowIndex, key, e.target.value)}
      />
    ) : (
      row[key]
    )
      :
      row[key]
  );

  const handleCellContentChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    setData(updatedData);
  };

  const handleCancelEdit = (index) => {
    if (data[index].new_data === true) {
      const updatedData = data.filter(item => !item.new_data);
      setData(updatedData);
    }

    setEditArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = true;
      return newArr;
    });

    setIsEditing(false);
  }

  const handleEdit = (index) => {
    if (editArr.some((edit) => edit === false)) {
      toast.error("Save changes before editing another row");

      return false;
    }

    setEditArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = false;
      return newArr;
    });

    setIsEditing(true);
  };

  const handleChange = (field, value) => {
    setWorkflowDetail({
      ...workflowDetail,
      [field]: value,
    });
  };

  const handleSubmitEdit = (index, workflowid) => {
    if (!data[index].wf_name || !data[index].wf_code || !data[index].wf_status || !data[index].wf_active_date) {
      toast.error("Please fill out the required fields")
      return false
    }

    const workflowData = {
      wf_name: data[index].wf_name,
      wf_code: data[index].wf_code,
      wf_desc: data[index].wf_desc,
      wf_status: data[index].wf_status,
      wf_active_date: data[index].wf_active_date,
    };
    //submit data
    if (workflowid) {
      //update
      /*putAward(workflowid, workflowData)
          .then((response) => {

              if (response?.response?.data?.message) {
                  if (
                      response?.response?.data?.message?.length > 0 &&
                      Array.isArray(response?.response?.data?.message)
                  ) {
                      response?.response?.data?.message?.map((contentErr) => {
                          toast.error(contentErr?.msg);
                      });
                  } else {
                      toast.error(response?.response?.data?.message);
                  }
              } else if (response?.response?.status == 404) {
                  toast.error("Data not found");
              } else {
                  toast.success(`Changes saved successfully`);
                  getAwards();

                  setEditArr((prevArr) => {
                      const newArr = [...prevArr];
                      newArr[index] = true;
                      return newArr;
                  });
                  setIsEditing(false);
                  setIsDisabled(false)
              }
          })
          .catch((error) => {
              toast.error(error.response?.data.message);
          });*/
    } else {
      //post
      postWorkflow(workflowData)
        .then((response) => {

          if (response?.response?.data?.message) {
            if (
              response?.response?.data?.message?.length > 0 &&
              Array.isArray(response?.response?.data?.message)
            ) {
              response?.response?.data?.message?.map((contentErr) => {
                toast.error(contentErr?.msg);
              });
            } else {
              toast.error(response?.response?.data?.message);
            }
          } else if (response?.response?.status === 404) {
            toast.error("Data not found");
          } else {
            toast.success(`Changes saved successfully`);
          }
        })
        .catch((error) => {
          toast.error(error.response?.data.message);
        });
    }
  };

  useEffect(() => {
    if (workflowidParams) {
      setWorkflowID(workflowidParams);
    }

    setFormMode(workflowidParams !== null ? "edit" : "add");
    const str = new Date();

    if (workflow_id !== '' && formMode === "edit") {
      console.log(str.toString() + "- invoke getWorkFlowAPI");
      getWorkFlowDetail();
      setStageShowhide(true);

      // console.log("workflowDetail", workflowDetail);
      //  getWorkflowStagesList();
    }
    else {
      workflowDetail.wf_status = 1
      setStageShowhide(false);
    }
    console.log("workflowidParams", workflowidParams);

    console.log("formMode", formMode);
    console.log("workflow_id", workflow_id);
  }, [workflow_id]);



  return (
    <Layout currentNav={"administration"}>
      <sgds-content-header-top>
        <div>
          <h1>{formMode === "add" ? "Add new workflow" : "Workflow: " + workflowDetail?.wf_name}</h1>
        </div>
      </sgds-content-header-top>
      <sgds-content-body>

        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          {/* <section className="shadow rounded p-5" > */}
          <Col sm={12}>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Workflow Code
                    <span className={`text-danger`}> *</span>
                  </Form.Label>
                  <Form.Control type="text"
                    value={workflowDetail?.wf_code}
                    //value={workflowDetail?.wf_name ? workflowDetail.wf_name.replace(/\s+/g, '_') : ''}
                    onChange={(e) =>
                      handleChange("wf_code", e.target.value)
                    }
                    placeholder="Enter the unique code for the workflow"
                    required={true}
                    readOnly={formMode === "edit" ? true : false}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} >
                <Form.Group className="mb-3">
                  <Form.Label>
                    Workflow Name
                    <span className={`text-danger`}> *</span>
                  </Form.Label>
                  <Form.Control type="text"
                    value={workflowDetail?.wf_name}
                    placeholder="Enter the name of the workflow"
                    onChange={(e) =>
                      handleChange("wf_name", e.target.value)
                    }
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Workflow Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={workflowDetail?.wf_description}
                    placeholder="Describe the workflow (Max 500 characters)"
                    onChange={(e) =>
                      handleChange("wf_description", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className={`d-flex flex-column`}>
                  <Form.Label>Workflow Status</Form.Label>


                  <Form.Check
                    type="switch"
                    name="switchActive"
                    checked={(formMode === "add" && workflowDetail?.wf_status === undefined) ? 1 : workflowDetail?.wf_status === 1}
                    label={workflowDetail?.wf_status === 1 ? "Active" : "Inactive"}
                    onChange={(e) =>
                      handleChange(
                        "wf_status",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>

              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}><Form.Group className={`d-flex flex-column`}>
                <Form.Label>
                  Active Date
                  <span className={`text-danger`}> *</span>
                </Form.Label>

                <DatePicker
                  className={`form-control`}
                  selected={workflowDetail?.wf_active_date ? new Date(workflowDetail.wf_active_date) : null}
                  placeholderText="Select the effective date for the workflow"
                  onChange={(date) => {
                    if (date == null) {
                      handleChange("wf_active_date", "");
                    } else {
                      handleChange(
                        "wf_active_date",
                        moment(date).format("YYYY-MM-DD HH:mm:ss")
                      )

                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  //disabled={editable.applicationDisabled}
                  required={true}
                />
              </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {workflowDetail?.wf_status === 0 && (
                  <Form.Group className={`d-flex flex-column`}>
                    <Form.Label>
                      Inactive Date
                      <span className={`text-danger`}> *</span>
                    </Form.Label>

                    <DatePicker
                      className={`form-control`} vi
                      selected={workflowDetail?.wf_inactive_date ? new Date(workflowDetail.wf_inactive_date) : null}
                      onChange={(date) => {
                        if (date == null) {
                          handleChange("wf_inactive_date", "");
                        } else {
                          handleChange(
                            "wf_inactive_date",
                            moment(date).format("YYYY-MM-DD HH:mm:ss")
                          )

                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      required={workflowDetail?.wf_status === 0}
                    />
                  </Form.Group>)}
              </Col>
            </Row>
            <Row>
              <div className="d-flex justify-content-end pt-5">
                <Button variant="outline-dark" className="me-4" onClick={() => backToListPage()} >Cancel</Button>
                <Button variant="primary" type="submit">Save</Button>
              </div>
            </Row>
          </Col>
          {/* </section> */}
        </Form>

        {stageShowhide === true && (
          <>
            <Form onSubmit={(e) => {
              e.preventDefault();
              // handleStageSubmit();
            }}>
              {/* <section className="shadow rounded p-5" > */}
              <Col sm={12}>
                <Row>
                  <div>
                    <Button type="button" variant="btn btn-link ps-0 text-decoration-none" onClick={handleAddRow}>
                      <i className="bi bi-plus-circle"></i> {"  "} Add stages
                    </Button>
                  </div>
                  <div className={`p-3 bg-white shadow-sm`}>
                    <SortableTable headers={header} data={dataWorkflowStages} renderActionButtons={renderActionButtons}
                      renderCellContent={renderCellContent} setData={setData} />

                  </div>
                </Row>
              </Col>
              {/* </section> */}
            </Form>
          </>
        )}

      </sgds-content-body>
    </Layout>
  )
}