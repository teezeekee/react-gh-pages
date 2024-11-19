import {FormCheck, Table} from "@govtechsg/sgds-react";
import React, { useEffect } from "react";

export default function SortableTable({headers, data, renderActionButtons, renderCellContent, setData, renderCheckButtons, selectAll, handleSelectAll}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(null);

    const sortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /*
    const sortedData = React.useMemo(() => {
        if (orderBy === null) return data;


        const newData = [...data].sort((a, b) => {
            const aValue = a[orderBy]?.toString() || '';
            const bValue = b[orderBy]?.toString() || '';
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });

        return newData
    }, [order, orderBy]);
    */

    useEffect(() => {
        // setData([...data].sort((a, b) => {
        //     const aValue = a[orderBy]?.toString() || '';
        //     const bValue = b[orderBy]?.toString() || '';
        //     return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        // }))

        setData([...data].sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];

            const aNumber = isNaN(Number(aValue)) ? aValue : Number(aValue);
            const bNumber = isNaN(Number(bValue)) ? bValue : Number(bValue);

            if (typeof aNumber === 'number' && typeof bNumber === 'number') {
                return order === 'asc' ? aNumber - bNumber : bNumber - aNumber;
            } else {
                const aComparable = aValue?.toString() || '';
                const bComparable = bValue?.toString() || '';
                return order === 'asc'
                    ? aComparable.localeCompare(bComparable)
                    : bComparable.localeCompare(aComparable);
            }
        }));

    }, [order, orderBy])

    return (
        <Table responsive>
            <Table.Header>
                <Table.Row>
                    {headers.map((header, index) => (
                        <Table.HeaderCell key={index}  style={{ width: header.width }} valign="top">
                            {header.key === 'action' || header.key === 'index' ? (
                                header.label
                            ) : header.key === 'check' ? (
                                <FormCheck
                                    id="table_no"
                                    label=""
                                    name="table_no "
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            ) : (
                                header.sortable ? (
                                <Table.SortLabel
                                    onClick={sortHandler(header.key)}
                                    active={orderBy === header.key}
                                    direction={order}
                                >
                                    {header.label} {header.required && (
                                    <span className={`text-danger`}>{" "}*</span>
                                )}
                                </Table.SortLabel>
                                ) : (
                                    header.label
                                  )
                            )}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, rowIndex) => (
                    <Table.Row key={rowIndex}>
                        {headers.map((header, headerIndex) => (
                            <Table.DataCell key={headerIndex}>
                                {header.key === 'index' ? (
                                    rowIndex + 1
                                ) : header.key === 'action' ? (
                                    renderActionButtons ? renderActionButtons(row, rowIndex) : null
                                ) : header.key === 'check' ? (
                                    renderCheckButtons ? renderCheckButtons(row, rowIndex) : null
                                ) : renderCellContent ? (
                                    renderCellContent(row, rowIndex, header.key)
                                ) : (
                                    row[header.key] || ''
                                )}
                            </Table.DataCell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
