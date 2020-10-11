import React from 'react';
import {Create, SimpleForm, TextInput, NumberInput} from 'react-admin';

const OrderCreate = (props) => {
    return (
        <Create title = 'New Order' {...props}>
            <SimpleForm>
                <TextInput source='productId' />
                <NumberInput label = 'quantity' source='quantity' />
            </SimpleForm>
        </Create>
    )
};

export default OrderCreate;