import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    BooleanField,
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
                    label='Photos in category testing'
                    source='photoList'>
                    <SingleFieldList>
                        <ReferenceField source='_id' reference='photos'>
                            <ChipField source='title'/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>

            </SimpleShowLayout>
        </Show>
    )
};

export default CategoryShow;