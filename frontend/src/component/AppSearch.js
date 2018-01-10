import React from "react";
import {withStyles} from "material-ui/styles";
import Search from "material-ui-icons/Search";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Downshift from "downshift";
import Paper from "material-ui/Paper";
import {MenuItem} from "material-ui/Menu";
import headerBG from "../static/library.jpg";

const classes = theme => ({
    iconButton: {
        flexDirection: 'row',
        background: '#5fb611',
        color: 'white',
        height: '43px',
        minWidth: '70px',
        '&hover': {
            background: '#5fb611'
        }
    },
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
    searchWrapper: {
        color: 'black',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flex: 6,
        position: 'absolute',
        top: '45%'
    },
    headerImg: {
        width: '100%',
        height: '100%',
        margin: '0 -20px',
    },
    AppHeader: {
        position: 'relative',
        backgroundColor: '#222',
        height: '300px',
        color: 'white'
    },
    searchTitle: {
        position: 'absolute',
        top: '17%',
        left: '35%',
        color: '#fff',
        fontSize: '34px',
        fontWeight: 200,
        textAlign: 'center',
        marginBottom: '30px',
        textTransform: 'uppercase'
    },
    searchTitleWord: {
        color: '#5fb611'
    },
});

let style = {
    searchBtnStyle: {
        color: 'white',
        fontSize: '16px',
        width: '28px',
        height: '28px',
        '&:hover': {
            background: '#5fb611'
        }
    }
}

class AppSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, theme, bookList, handleSearch} = this.props;
        return (
            <div className={classes.AppHeader}>
                <img src={headerBG} alt="logo" className={classes.headerImg}/>
                <h2 className={classes.searchTitle}>
                    DISCOVER <span className={classes.searchTitleWord}>YOUR</span> BOOKS
                </h2>
                <div className={classes.searchWrapper}>
                    <AutoSuggest classes={classes} theme={theme} bookList={bookList} handleSearch={handleSearch}/>
                    <Button className={classes.iconButton} onClick={handleSearch}>
                        <Search style={style.searchBtnStyle}/>
                    </Button>
                </div>
            </div>
        );
    }
}

function renderInput(inputProps) {
    const {classes, handleSearch, onChange, autoFocus, onKeyDown, value, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                      disableUnderline: true,
                      classes: {
                        input: classes.inputStyle,
                      }
                 }}
            onChange={(event) => {
            onChange(event)
            handleSearch(event)
            }}
            fullWidth
            placeholder="Search by Book or Author"
            className={classes.textFieldStyle}
            autoFocus={autoFocus}
            value={value}
            inputRef={ref}
        />
    );
}

function renderSuggestion(params) {
    const {suggestion, index, itemProps, theme, highlightedIndex, selectedItem} = params;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem === suggestion.label;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.id}
            selected={isHighlighted}
            component="div"
            style={{
            width: '418px',
            display: 'block',
            color: 'black',
        fontWeight: isSelected
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
      }}
        >
            {suggestion.name} - {suggestion.author}
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function AutoSuggest(props) {
    let {classes, theme, bookList, handleSearch} = props;

    return (
        <Downshift
            onChange={handleSearch}
            render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div>
          {renderInput(
            getInputProps({
              classes,
              placeholder: 'Search a country (start with a)',
              id: 'integration-downshift',
              handleSearch: handleSearch
            }),
          )}
          {isOpen
            ? renderSuggestionsContainer({
                children: bookList.map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    theme,
                    itemProps: getItemProps({ item: suggestion.name }),
                    highlightedIndex,
                    selectedItem,
                  }),
                ),
              })
            : null}
        </div>
      )}
        />
    );
}

export default withStyles(classes, {withTheme: true})(AppSearch);
