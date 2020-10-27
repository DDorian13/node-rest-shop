import React from 'react';
import {Create, SimpleForm, TextInput, ImageInput, ImageField, NumberInput} from 'react-admin';

const ProductCreate = (props) => {
    return (
        <Create title = 'New Product' {...props}>
            <SimpleForm>
                <TextInput source='title' />
                <NumberInput source='year' />
                <TextInput source='author' />
                <TextInput multiline label='Description' source='desc' />
                <ImageInput label = 'Image of Product' source='productImage'>
                           <ImageField source='src'/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
};

export default ProductCreate;