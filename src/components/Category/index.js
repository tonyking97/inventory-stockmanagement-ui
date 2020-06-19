import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import withWidth from '@material-ui/core/withWidth';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const filter = createFilterOptions();

const top100Films = [
    { title: 'pcs'},
    { title: 'kg'},
    { title: 'g'},
    { title: 'ltr'},
    { title: 'box'},
    { title: 'cm'},
    { title: 'dz'},
    { title: 'ft'},
    { title: 'in'},
    { title: 'km'},
    { title: 'lb'},
    { title: 'mg'},
    { title: 'm'},
];

function Index(props) {
    const [value, setValue] = React.useState(null);

    return(
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                New Category
            </Typography>
            <Divider/>
            <Box pt={2}>
                <form noValidate autoComplete="off">
                    <Grid
                        container
                        justify="flex-start"
                        alignItems="center"
                        spacing={props.width === 'xs' || props.width === 'sm' ? 1 : 3}
                    >
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">
                                Category Name*
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                aria-label={'Category Name'}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">
                                Description
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                aria-label={'Description about category'}
                                variant="outlined"
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">
                                Unit*
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setValue({
                                            title: newValue.inputValue,
                                        });
                                        top100Films.push({title: newValue.inputValue})
                                    } else {
                                        setValue(newValue);
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            title: `Add "${params.inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                options={top100Films}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.title;
                                }}
                                renderOption={(option, { inputValue }) => {
                                    const matches = match(option.title, inputValue);
                                    const parts = parse(option.title, matches);

                                    return (
                                        <div>
                                            {parts.map((part, index) => (
                                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                    {part.text}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Unit"
                                        aria-placeholder="Select or Add Unit"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">
                                Manufacture
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setValue({
                                            title: newValue.inputValue,
                                        });
                                        top100Films.push({title: newValue.inputValue})
                                    } else {
                                        setValue(newValue);
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            title: `Add "${params.inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                options={top100Films}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.title;
                                }}
                                renderOption={(option, { inputValue }) => {
                                    const matches = match(option.title, inputValue);
                                    const parts = parse(option.title, matches);

                                    return (
                                        <div>
                                            {parts.map((part, index) => (
                                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                    {part.text}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Manufacture"
                                        aria-placeholder="Select or Add Manufacture"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle1">
                                Brand
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setValue({
                                            title: newValue.inputValue,
                                        });
                                        top100Films.push({title: newValue.inputValue})
                                    } else {
                                        setValue(newValue);
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            title: `Add "${params.inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                options={top100Films}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.title;
                                }}
                                renderOption={(option, { inputValue }) => {
                                    const matches = match(option.title, inputValue);
                                    const parts = parse(option.title, matches);

                                    return (
                                        <div>
                                            {parts.map((part, index) => (
                                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                    {part.text}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Brand"
                                        aria-placeholder="Select or Add Brand"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </React.Fragment>
    );
}

export default withWidth()(Index);