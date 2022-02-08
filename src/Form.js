import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { v4 as uuidv4 } from "uuid";

function Form(props) {
    
    const [InputData, setInputData] = useState([
        { id: uuidv4(), Label: "", Value: "" },
      ]);


      const removeFields = (id) => {
        const values = [...InputData];
        values.splice(
          values.findIndex((value) => value.id === id),
          1
        );
        setInputData(values);
      };
    
    const addFields = () => {
        setInputData([...InputData, { id: uuidv4(), Label: "", Value: "" }]);
      };

      const sendData = () =>{
          props.getData(InputData);
      }
    return (
        <>
            <form>
            {InputData.map((field) => (
                <div key={field.id}>
                    <TextField
                        name="Label"
                        label="Label"
                        variant="filled"
                        value={InputData.Label}
                    />
                    <TextField
                        name="Value"
                        label="Value"
                        variant="filled"
                        value={InputData.Value}
                    />
                    <IconButton disabled={InputData.length === 1} onClick={() => removeFields(field.id)}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                        onClick={addFields}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton 
                        onClick={sendData}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
                ))}
            </form>
        </>
    );
}

export default Form;