import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import withWidth from '@material-ui/core/withWidth';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Button from "@material-ui/core/Button";
import {inventoryStyles, Label, MandatoryLabel} from "../../styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import ChipInput from 'material-ui-chip-input'
import Chip from "@material-ui/core/Chip";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const filter = createFilterOptions();

const units = [
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
    const classes = inventoryStyles();
    const {InventoryService} = props;
    const { register, errors, setValue, handleSubmit } = useForm();
    const [unitValue, setUnitValue] = React.useState(null);
    const [multipleAttributes,setMultipleAttributes ] = React.useState(false);
    const [categoryNames, setcategoryNames] = React.useState([]);

    useEffect(()=>{
        //Check for server connection
        const message = { ping: "Pinggg", msgType: "PingRequest" }
        InventoryService.Ping(
            message,
            {},
            (err, response) => {
                if(err){
                    console.log(err)
                } else {
                    console.log("Connected to the golang server using gRPC")
                }
            }
        );

        //Get Category Names
        const message_name = {msgType: "GetCategoryRequest"}
        InventoryService.GetCategory(
            message_name,
            {},
            (err, res) => {
                if(err){
                    console.log(err)
                } else {
                    setcategoryNames(res.categorynameList);
                }
            }
        );

    },[InventoryService, setcategoryNames]);

    const onSubmit = data => {
        const message = {
            name: data.categoryName,
            description: data.Description,
            parent: data.parentCategoryId,
            unit: data.unit,
            manufacturer: data.manufacture,
            brand: data.brand,
            msgType: "AddCategoryRequest"
        };
        InventoryService.AddCategory(
            message,
            {},
            (err, res) => {
                console.log(res)
            }
        );
    }

    return(
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                New Category
            </Typography>
            <Divider/>
            <Box pt={2}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <Grid
                        container
                        justify="flex-start"
                        alignItems="center"
                        spacing={props.width === 'xs' || props.width === 'sm' ? 1 : 3}
                    >
                        <Grid item xs={12} md={2}>
                            <MandatoryLabel>
                                category name*
                            </MandatoryLabel>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                name="categoryName"
                                aria-label={'Category Name'}
                                variant="outlined"
                                size="small"
                                inputRef={register({required:"Category Name is required.", minLength:{value:3, message:"Category name must be atleast 3 letters."}})}
                                error={!!errors.categoryName}
                                helperText={errors.categoryName?.message}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Label>
                                description
                            </Label>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                name="Description"
                                aria-label={'Description about category'}
                                variant="outlined"
                                multiline
                                rows={3}
                                inputRef={register}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Label>
                                parent category
                            </Label>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <input name="parentCategoryId" ref={register} hidden/>
                            <Autocomplete
                                options={categoryNames}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {setValue("parentCategoryId", value.id)}}
                                renderInput={(params) =>
                                    <TextField
                                        name="parentCategory"
                                        {...params}
                                        size="small"
                                        placeholder="Select Parent Category if exists"
                                        variant="outlined"
                                        inputRef={register}
                                        fullWidth
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <MandatoryLabel>
                                Unit*
                            </MandatoryLabel>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={unitValue}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setUnitValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setUnitValue({
                                            title: newValue.inputValue,
                                        });
                                        units.push({title: newValue.inputValue})
                                    } else {
                                        setUnitValue(newValue);
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
                                options={units}
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
                                        name="unit"
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Unit"
                                        aria-placeholder="Select or Add Unit"
                                        variant="outlined"
                                        inputRef={register({required:"Please select unit."})}
                                        error={!!errors.unit}
                                        helperText={errors.unit?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Label>
                                Manufacture
                            </Label>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={unitValue}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setUnitValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setUnitValue({
                                            title: newValue.inputValue,
                                        });
                                        units.push({title: newValue.inputValue})
                                    } else {
                                        setUnitValue(newValue);
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
                                options={units}
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
                                        name="manufacture"
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Manufacture"
                                        aria-placeholder="Select or Add Manufacture"
                                        variant="outlined"
                                        inputRef={register}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Label>
                                Brand
                            </Label>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Autocomplete
                                value={unitValue}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setUnitValue({
                                            title: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        setUnitValue({
                                            title: newValue.inputValue,
                                        });
                                        units.push({title: newValue.inputValue})
                                    } else {
                                        setUnitValue(newValue);
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
                                options={units}
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
                                        name="brand"
                                        {...params}
                                        size="small"
                                        placeholder="Select or Add Brand"
                                        aria-placeholder="Select or Add Brand"
                                        variant="outlined"
                                        inputRef={register}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <MandatoryLabel>
                                multiple attributes?*
                            </MandatoryLabel>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={multipleAttributes}
                                            onChange={()=>{setMultipleAttributes(!multipleAttributes)}}
                                        />
                                    }
                                    label="Create Custom Attributes and Options"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={5}>
                        </Grid>

                        {
                            multipleAttributes ?
                                <React.Fragment>
                                    <Grid item xs={12} md={2}>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="flex-start"
                                            spacing={1}
                                        >
                                            <Grid item xs={12} md={6}>
                                                <MandatoryLabel>
                                                    Attribute*
                                                </MandatoryLabel>
                                                <TextField
                                                    aria-label={'Attribute Name'}
                                                    variant="outlined"
                                                    placeholder={'Enter Attribute Name'}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MandatoryLabel>
                                                    Option*
                                                </MandatoryLabel>
                                                <ChipInput
                                                    variant={"outlined"}
                                                    placeholder="Enter Attribute Options"
                                                    fullWidth
                                                    chipRenderer={({ value, isFocused, isDisabled, handleClick, handleRequestDelete }, key) => (
                                                        <Chip
                                                            key={key}
                                                            size="small"
                                                            label={value}
                                                            onDelete={()=>{alert("delete")}}
                                                            color="secondary"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                <Grid item xs={12} md={5}>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <Button
                                    startIcon={<AddCircleIcon color="secondary" />}
                                    size="small"
                                    >
                                        Add more attributes
                                    </Button>
                                </Grid>
                            </React.Fragment>
                            :
                            null
                        }

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary">
                                Save
                            </Button>
                            <span className={classes.ButtonSpace} />
                            <Button variant="contained">
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </React.Fragment>
    );
}

export default withWidth()(Index);