import React from 'react';
import {List, Datagrid, TextField, NumberField, EditButton, DeleteButton} from 'react-admin';

const OrderList = (props) => {
    return <List {...props}>
        <Datagrid>
            <TextField label = 'Title of product' source = 'product.title' />
            <NumberField source = 'quantity' />
            <EditButton basePath = '/orders' />
            <DeleteButton basePath = '/orders' />
        </Datagrid>
    </List>
};

export default OrderList;