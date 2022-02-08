import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";

import Form from "./Form";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiSelect-root": {
      margin: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), Label: "", Dropdown: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), Label: "", Dropdown: "" }]);
  };

  const getData = (val) =>{
    console.log(val);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const selectValue = (id, event) => {
   
    // setField(e.target.value);
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };
  return (
    <Container>
      <h1>Services</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <TextField
              name="Label"
              label="Label"
              variant="filled"
              value={inputField.Label}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />

            <Select
              name="Dropdown"
              value={inputField.Dropdown}
              displayEmpty
              onChange={(event) => selectValue(inputField.id, event)}
            >
              <MenuItem value="Textfield">Textfield</MenuItem>
              <MenuItem value="Dropdown">DropDown</MenuItem>
            </Select>

            <IconButton
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
            {inputField.Dropdown === "Dropdown" ? (
              <Form
                inputFields={inputFields}
                inputField={inputField}
                handleAddFields={handleAddFields}
                handleRemoveFields={handleRemoveFields}
                handleSubmit={handleSubmit}
                getData = {getData}
              />
            ) : (
              ""
            )}
          </div>
        ))}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </Container>
  );
}

export default App;
