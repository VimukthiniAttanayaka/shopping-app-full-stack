import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import {Pagination, Table} from 'react-bootstrap';

interface ReactTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    rowCount: number
    setPagination: any
}

export default function ReactTable<T>({ columns, data, setPagination , rowCount}: ReactTableProps<T>) {

    const { getHeaderGroups, getRowModel, firstPage, previousPage, nextPage, lastPage }
        = useReactTable({
        columns, data, rowCount, pageCount: rowCount , getCoreRowModel: getCoreRowModel() , onPaginationChange: setPagination
        });

    return (
        <div>
        <Table responsive="sm" striped bordered hover className="mt-3">
            <thead className="thead-dark">
            {getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="text-center fw-bold f-s2">
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="text-center align-middle f-s2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
            <div className=' d-flex justify-content-end '>
               <Pagination>
                   <Pagination.First onClick={() => firstPage()}/>
                   <Pagination.Prev onClick={() => previousPage()}/>
                   <Pagination.Next onClick={() => nextPage()}/>
                   <Pagination.Last onClick={() => lastPage()}/>
               </Pagination>
            </div>
        </div>
    );
}
