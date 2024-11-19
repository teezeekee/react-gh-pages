import { Button, Col, Dropdown, Form, FormCheck, Row, Table } from "@govtechsg/sgds-react";
import Select from "react-select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Link, useNavigate } from 'react-router-dom';
import { getWorkflow } from "@/apis/workflowAPI";
import SortableTable from "@/components/SortableTable";
import { toast } from "react-toastify";


export default function WorkflowList() {
    const navigate = useNavigate()

    const addNewWorkflow = () => {
        navigate("/administration/workflow-detail");
    }

    const [header, setHeader] = useState([
        { key: 'wf_name', label: 'Workflow Name', required: true, sortable: true },
        { key: 'wf_description', label: 'Description', required: false },
    ]);

    const [dataWorkflows, setDataWorkflows] = useState([
        {
            wf_name: "Workflow 1",
            wf_description: "Description 1",
        }
    ]);




    const getWorkflowList = () => {
        getWorkflow()
            .then((response) => {
                console.log("Get Workflow");
                setDataWorkflows(response?.data.data);
            })
            .catch((error) => {
                toast.error(error.response?.data.message);
            });
    };

    const handleGetWorkflows = async () => {
        try {
            const workflows = await getWorkflow(
            );

            setDataWorkflows(workflows?.data?.data);

            console.log("hahahaha")
        } catch (error) {
            console.error(error);
        }
    };


    const [groupEdit, setGroupEdit] = useState({ name: "", age: "" });

    const [selectAll, setSelectAll] = useState(false);

    const [show, setShow] = useState(false);




    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setDataWorkflows(dataWorkflows.map((item) => ({ ...item, checked: newSelectAll })));
        updateGroupEditForm(newSelectAll ? dataWorkflows : []);
    };

    const updateGroupEditForm = (selectedItems) => {
        if (selectedItems.length === 0) {
            setGroupEdit({ name: "", age: "", role: "" });
            return;
        }
        const name = selectedItems.map((item) => item.name).join(", ");
        const age = selectedItems.map((item) => item.age).join(", ");
        const role = selectedItems.map((item) => item.role).join(", ");
        setGroupEdit({ name, age, role });
    };

    const handleSelectItem = (id) => {
        const newItems = dataWorkflows.map((item) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setDataWorkflows(newItems);
        setSelectAll(newItems.every((item) => item.checked));
        updateGroupEditForm(newItems.filter((item) => item.checked));
    };

    const handleChange = (id, field, value) => {
        setDataWorkflows(
            dataWorkflows.map((item) => {
                if (item.id === id) {
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    };

    const handleDelete = (id) => {
        setDataWorkflows(dataWorkflows.filter((item) => item.id !== id));
    };

    const handleEdit = (id) => {
        setDataWorkflows(
            dataWorkflows.map((item) => {
                if (item.id === id) {
                    return { ...item, editable: !item.editable };
                }
                return item;
            })
        );
    };


    const renderCellContent = (row, rowIndex, key) => (
        key === "wf_name" ? (
            console.log(row),
            <Link
                to={`/administration/workflow-detail?mode=edit&wfid=${row.wf_guid}`}>{row.wf_name}</Link>
        ) :
            (
                key === "description" ? (
                    row[key]
                ) : (
                    row[key]
                )
            )
    );


    const renderActionButtons = (row, rowIndex) => (
        <div className={`d-flex gap-1`}>
            {/* {!editArr[rowIndex] ? (
                <div className={`d-flex gap-1`}>
                    <button
                        className={`btn-clear text-green-500`}
                       // onClick={() => handleSubmitEdit(rowIndex, row.id)}
                    >
                        <i className={`bi bi-check-lg`}></i>
                        Save
                    </button>

                    <button
                        className={`btn-clear text-red-500`}
                     //   onClick={() => handleCancelEdit(rowIndex)}
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
                //    onClick={() => handleEdit(rowIndex)}
                >
                    <i className={`bi bi-pencil`}></i>
                    {` `}
                    Edit
                </button>
            )} */}

            <button
                className={`btn-clear`}
                //  disabled={rowIndex == 0 ? row?.id ? isEditing : false : isEditing}
                onClick={() => {
                    setShow(true);
                    //  setSelectedId(row.id ?? "");
                    // setSelectedIndex(rowIndex);
                }}
            >
                <i className={`bi bi-trash`}></i>
            </button>
        </div>
    );

    useEffect(() => {
        getWorkflowList();
    }, []);

    return (
        <Layout currentNav={"administration"}>
            <sgds-content-header-top>
                <h2>Configuring Workflow</h2>
            </sgds-content-header-top>
            <sgds-content-body>
                <div className="d-flex gap-4 flex-column">
                    <div className={`p-3 bg-white shadow-sm border rounded border-1`}>
                        <div className="row">
                            <div className="col">
                                <h3>Data Retrieval</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <Row className={`justify-content-end`}>
                    <Col xs={12}>
                        <Button variant={`outline-dark`} className={`d-flex gap-3`} onClick={() => addNewWorkflow()}>
                            <i className="bi bi-plus-circle"></i>
                            Add new workflow
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <SortableTable headers={header} data={dataWorkflows}
                            renderCellContent={renderCellContent} setData={setDataWorkflows} />
                    </Col>
                </Row>
            </sgds-content-body>
        </Layout>
    )
}