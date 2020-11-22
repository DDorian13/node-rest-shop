import React from 'react';
import {Create, SimpleForm, TextInput, ImageField, ImageInput} from 'react-admin';

const PhotoCreate = (props) => {
    return (
        <Create title = 'New Photo' {...props}>
            <SimpleForm>
                <TextInput source='title'/>
                <TextInput multiline={true} source='description'/>
                <ImageInput label = 'Image'
                            source='ownImage'>
                    <ImageField source='src'/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
};

export default PhotoCreate;