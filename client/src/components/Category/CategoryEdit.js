import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    ReferenceInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput
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

                <ArrayInput label='Photos in category' source='photoList'>
                    <SimpleFormIterator>
                        <ReferenceInput label='Selected photo' source='_id' reference='photos'>
                            <SelectInput optionText='title'/>
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>

            </SimpleForm>
        </Edit>
    )
};

export default CategoryEdit;