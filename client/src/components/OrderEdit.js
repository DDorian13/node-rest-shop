import React from 'react';
import {Edit, SimpleForm, TextInput, NumberInput, Create} from 'react-admin';

const OrderCreate = (props) => {
    return (
        <Create title = 'Edit Order' {...props}>
            <SimpleForm>
                <TextInput source='productId' />
                <NumberInput label = 'quantity' source='quantity' />
            </SimpleForm>
        </Create>
    )
};

export default OrderCreate;