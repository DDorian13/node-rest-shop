import React from 'react';
import {Create, SimpleForm, NumberInput, SelectInput, ReferenceInput} from 'react-admin';

const OrderCreate = (props) => {
    return (
        <Create title = 'New Order' {...props}>
            <SimpleForm>
                <ReferenceInput
                    source="productId"
                    reference='products'
                    allowEmpty={false}>
                    <SelectInput
                        source='productId'
                        optionText='title'
                        optionValue='id'
                    />
                </ReferenceInput>
                <NumberInput label = 'quantity' source='quantity' />
            </SimpleForm>
        </Create>
    )
};

export default OrderCreate;