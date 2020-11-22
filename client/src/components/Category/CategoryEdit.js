import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectArrayInput,
    ReferenceArrayInput,
    ReferenceInput
} from 'react-admin';

const CategoryEdit = (props) => {
    return (
        <Edit title = 'Edit Category' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='name' />
                <TextInput disabled label = 'Creator' source='creator.email' />
                <NumberInput source='limit' />
                <BooleanInput source='visibility' />
                <ReferenceArrayInput
                    label='Photos in category'
                    source="photoList"
                    reference='photos'>
                    <SelectArrayInput
                        multiple={true}
                        allowNull={true}
                        source='photoList'
                        optionText='title'
                        optionValue='id'
                    />
                </ReferenceArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default CategoryEdit;