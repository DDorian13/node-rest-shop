import React from 'react';
import {Edit, SimpleForm, TextInput, ImageInput, NumberInput, ImageField} from 'react-admin';

const ProductEdit = (props) => {
    return (
        <Edit title = 'Edit Product' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='title' />
                <NumberInput label = 'year' source='year' />
                <TextInput source='author' />
                <TextInput multiline source='desc' />
                <ImageInput label = 'Image of Product' source='productImage'>
                    <ImageField source='productImage'/>
                </ImageInput>
            </SimpleForm>
        </Edit>
    )
};

export default ProductEdit;