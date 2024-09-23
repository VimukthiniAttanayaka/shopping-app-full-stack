import {FC, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {GET_PRODUCTS} from "../../../api/product";
import {useQuery} from "@apollo/client";
import {toast} from "react-toastify";
import Skeleton from "../../common/Skeleton.tsx";
import ReactTable from "../common/ReactTable.tsx";
import ImageCell from "../common/table/ImageCell.tsx";
import ProductNameCell from "../common/table/ProductNameCell.tsx";
import QuantityCell from "../common/table/QuantityCell.tsx";
import DescriptionCell from "../common/table/DescriptionCell.tsx";
import ActionCell from "../common/table/ActionCell.tsx";
import {PaginationState} from "@tanstack/react-table";

const ProductsTable: FC = () => {
    // const products = allProducts.products;
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const {data, loading, error, fetchMore} = useQuery(GET_PRODUCTS, {
        variables: { offset: pagination.pageIndex * pagination.pageSize, limit: pagination.pageSize },
    });


    if (error) {
        toast.error("Data is not loading")
    }

    const formatPrice = (price: string) => {
        return 'LKR ' + parseFloat(price).toFixed(2);
    }

    const columns = [
        {
            header: 'Product',
            accessorKey: 'image',
            cell: (props: any) => <ImageCell image={props.getValue()}/>
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: (props: any) => <ProductNameCell productItem={props.row.original}/>
        },
        {
            header: 'Category',
            accessorKey: 'category',
        },
        {
            header: 'Price',
            accessorKey: 'price',
            accessorFn: (row: any) => formatPrice(row.price)
        },
        {
            header: 'Discounted price',
            accessorKey: 'discountedPrice',
            accessorFn: (row: any) => formatPrice(row.discountedPrice)
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            cell: (props: any) => <QuantityCell productItem={props.row.original}/>
        },
        {
            header: 'Description',
            accessorKey: 'description',
            cell: (props: any) => <DescriptionCell description={props.getValue()}/>
        },
        {
            header: 'action',
            accessorKey: 'action',
            cell: (props: any) => <ActionCell productItem={props.row.original}/>
        },
    ];

useEffect(() => {
    fetchMore({
        variables: { offset: pagination.pageIndex * pagination.pageSize, limit: pagination.pageSize },
    })
}, [pagination])

    if (loading) {
        return <Skeleton className="my-3 products-table-Skeleton w-100"/>
    } else {
        return(
        <Row className='mx-0 p-lg-4 content h-100'>
            <Col>
                {data && <ReactTable
                    columns={columns}
                    data={data?.getProducts?.products}
                    rowCount={data?.getProducts?.total}
                    setPagination={setPagination}
                />}
            </Col>
        </Row>
)
    ;
}
}

export default ProductsTable;
