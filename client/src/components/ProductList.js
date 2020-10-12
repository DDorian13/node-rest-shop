import React from 'react';
import {List, Datagrid, TextField, NumberField, ImageField, EditButton, DeleteButton} from 'react-admin';

const ProductList = (products) => {
    return <List {...products}>
            <Datagrid>
                <TextField source = 'title' />
                <NumberField source = 'year' />
                <TextField source = 'author' />
                <TextField multiline source = 'desc' />
                <ImageField source = 'productImage' />
                <EditButton record = '/_id' basePath = '/products' />
                <DeleteButton record = '/_id' basePath = '/products' />
            </Datagrid>
        </List>
};

export default ProductList;