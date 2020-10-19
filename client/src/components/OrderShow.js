import React from 'react';
import {Show, SimpleShowLayout, TextField, NumberField} from 'react-admin';

const OrderShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source='id' />
                <TextField source='product.title' />
                <NumberField source='quantity' />
            </SimpleShowLayout>
        </Show>
    )
};

export default OrderShow;