import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { Table } from 'react-bootstrap';

interface ReactTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

export default function ReactTable<T>({ columns, data }: ReactTableProps<T>) {
    const { getHeaderGroups, getRowModel } = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

    return (
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
    );
}
