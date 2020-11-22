import React from 'react';
import { useListContext, List, TextField, ImageField, EditButton, ShowButton, DeleteButton } from 'react-admin';
import { Card, CardActions, CardContent, CardHeader, Avatar } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

const cardStyle = {
    width: '20em',
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const useStyles = makeStyles({
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '18em',
        maxHeight: '20em',
    },
});

const PhotoGrid = () => {
    const { ids, data, basePath } = useListContext();
    const classes = useStyles();
    return (
        <div style={{ margin: '1em' }}>
            {ids.map(id =>
                <Card key={id} style={cardStyle}>
                    <CardHeader
                        title={<TextField record={data[id]} source="title" />}
                        subheader={<TextField showTime={true} label='Owner' record={data[id]} source="owner" />}
                    />
                    <CardContent style={{textAlign: 'center'}}>
                        <img src={data[id].ownImage} alt="" className={classes.img} />
                    </CardContent>
                    <CardActions style={{ textAlign: 'right' }}>
                        <EditButton resource="photos" basePath={basePath} record={data[id]} />
                        <ShowButton resource="photos" basePath={basePath} record={data[id]} />
                        <DeleteButton resource="photos" basePath={basePath} record={data[id]} redirect={'list'}/>
                    </CardActions>
                </Card>
            )}
        </div>
    );
};

const PhotoList2 = (props) => (
    <List title="All photos" {...props}>
        <PhotoGrid />
    </List>
);

export default PhotoList2;