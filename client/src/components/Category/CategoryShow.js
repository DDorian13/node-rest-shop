import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    BooleanField,
    ReferenceManyField,
    ReferenceField,
    ChipField,
    SingleFieldList
} from 'react-admin';

const CategoryShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source='id' />
                <TextField source='name' />
                <TextField source='creator.email' />
                <NumberField source='limit' />
                <BooleanField source='visibility'/>
                <ReferenceManyField
                    label='Photos in category'
                    source='photoList'
                    reference='photos'>
                    <SingleFieldList>
                        <ChipField source='title'/>
                    </SingleFieldList>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CategoryShow;