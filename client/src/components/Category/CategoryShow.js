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
                <ArrayField source={'photoList'}>
                    <SingleFieldList>
                        <ChipField source={'title'}/>
                    </SingleFieldList>
                </ArrayField>
                <ReferenceArrayField
                    label='Photos in category'
                    source='photoList'
                    reference='photos'>
                    <SingleFieldList>
                        <ChipField source='title'/>
                    </SingleFieldList>
                </ReferenceArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default CategoryShow;