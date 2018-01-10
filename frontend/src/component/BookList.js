import React from "react";
import {withStyles} from "material-ui/styles";
import Card, {CardContent, CardMedia} from "material-ui/Card";
import Typography from "material-ui/Typography";
import bookImg from "../static/book.jpg";

const styles = theme => ({
    textFieldStyle: {
        width: '450px',
        color: 'white',
    },
    inputStyle: {
        padding: '5px 10px',
        height: '33px',
        color: '#555',
        fontSize: '16px',
        fontWeight: 200,
        background: 'white',
    },
    searchColor: {
        color: 'white'
    },
    searchWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 6,
        color: 'white',
        position: 'absolute',
        top: '45%'
    },
    card: {
        width: 250,
        minHeight: 250,
        margin: 20
    },
    media: {
        height: 120,
    },
    cardWrapper: {
        height: '100%',
        display: 'flex',
        padding: '30px 20px 0',
        flexWrap: 'wrap'
    }
});


let Books = ({books, classes}) => {
    return <div className={classes.cardWrapper}>
        {
            books.length ? books.map((book)=> {
                return <Card id={book.id} className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={bookImg}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography type="headline" component="h2">
                            {book.author}
                        </Typography>
                        <Typography component="p">
                            {book.name} - {book.series}
                        </Typography>
                    </CardContent>
                </Card>
            }) : null
        }
    </div>
}
class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, bookList} = this.props;
        return (
            <Books books={bookList} classes={classes}/>
        );
    }
}

export default withStyles(styles)(BookList);
