import React from 'react';
import {Show, SimpleShowLayout, TextField, NumberField, ReferenceField, SingleFieldList, ChipField} from 'react-admin';

const OrderShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source='id' />
                <ReferenceField reference={'products'} source={'product'}>
                    <TextField source={'title'}/>
                </ReferenceField>
                <TextField source='product.title' />
                <NumberField source='quantity' />
            </SimpleShowLayout>
        </Show>
    )
};

export default OrderShow;