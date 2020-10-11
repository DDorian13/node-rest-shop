import React from 'react';
import {Edit, SimpleForm, TextInput, ImageInput, NumberInput} from 'react-admin';

const ProductCreate = (props) => {
    return (
        <Edit title = 'Edit Product' {...props}>
            <SimpleForm>
                <TextInput disabled source='_id' />
                <TextInput source='title' />
                <NumberInput label = 'year' source='year' />
                <TextInput source='author' />
                <TextInput multiline source='desc' />
                <ImageInput label = 'Image of Product' source='productImage' />
            </SimpleForm>
        </Edit>
    )
};

export default ProductCreate;