import React from 'react';
import {Create, SimpleForm, TextInput, BooleanInput, NumberInput} from 'react-admin';

const CategoryCreate = (props) => {
    return (
        <Create title = 'New Category' {...props}>
            <SimpleForm redirect='show'>
                <TextInput source='name'/>
                <BooleanInput source='visibility' />
                <NumberInput source='limit' />
            </SimpleForm>
        </Create>
    )
};

export default CategoryCreate;