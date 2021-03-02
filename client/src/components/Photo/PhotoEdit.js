import React from 'react';
import {Edit, SimpleForm, TextInput, DateTimeInput, ImageField, ArrayInput, SimpleFormIterator, NumberInput} from 'react-admin';

const PhotoEdit = ({permissions, ...props}) => {
    return (
        <Edit title = 'Edit Photo' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='title' />
                <TextInput multiline={true} source='description' />
                <ImageField source='ownImage'/>
                <NumberInput source='likes' label='Likes'/>
                <TextInput disabled label = 'Owner' source='ownerID.email'/>
                <DateTimeInput disabled label = 'Uploaded at' source='upload'/>
                <ArrayInput label='Comments' source='comment'>
                    <SimpleFormIterator disableRemove={true}>
                        <TextInput disabled label='User' source='user.email'/>
                        <TextInput label='Comment' source='text'/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default PhotoEdit;