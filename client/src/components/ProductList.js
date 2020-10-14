import React from 'react';
import {List, Datagrid, TextField, NumberField, ImageField, EditButton, DeleteButton} from 'react-admin';

const ProductList = (props) => {
    return <List {...props}>
            <Datagrid>
                <TextField source = 'title' />
                <NumberField source = 'year' />
                <TextField source = 'author' />
                <ImageField source = 'productImage' />
                <EditButton basePath = '/products' />
                <DeleteButton basePath = '/products' />
            </Datagrid>
        </List>
};

export default ProductList;