import React from 'react';
import {Show, SimpleShowLayout, TextField, NumberField} from 'react-admin';
//valami
const OrderShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source='_id' />
                <TextField source='product.title' />
                <NumberField source='quantity' />
            </SimpleShowLayout>
        </Show>
    )
};

export default OrderShow;