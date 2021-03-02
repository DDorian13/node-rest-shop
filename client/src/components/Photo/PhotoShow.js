import React from 'react';
import {Show, SimpleShowLayout, TextField, DateField, ImageField, ArrayField, Datagrid, NumberField} from 'react-admin';

const PhotoShow = (props) => {
    return (
        <Show {...props} title='Show Photo'>
            <SimpleShowLayout>
                <TextField source='id' />
                <TextField source='title' />
                <TextField source='description' />
                <ImageField label='Image' source='ownImage'/>
                <NumberField label='Likes' source='likes'/>
                <TextField label = 'Owner' source='ownerID.email'/>
                <DateField showTime={true} label = 'Uploaded at' source='upload'/>
                <ArrayField label='Comments' source='comment'>
                    <Datagrid>
                        <TextField label='User' source='user.email'/>
                        <TextField label='Comment' source='text'/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default PhotoShow;