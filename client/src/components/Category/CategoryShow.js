import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    BooleanField,
    ReferenceManyField,
    ReferenceArrayField,
    ReferenceField,
    ChipField,
    SingleFieldList,
    ArrayField
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
                <ArrayField
                    source='photoList'
                    label='Photos in category'>
                    <SingleFieldList>
                        <ChipField source='title'/>
                    </SingleFieldList>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CategoryShow;