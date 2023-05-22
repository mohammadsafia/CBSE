import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";

const App = () => {
  // States for storing various stages and final results of the process
  const [input, setInput] = useState(''); // User's text input
  const [output, setOutput] = useState(''); // Final output after encryption or decryption
  const [shift, setShift] = useState(0); // Shift value for Caesar cipher
  const [operation, setOperation] = useState('encrypt'); // Operation mode - encrypt or decrypt
  const [binary, setBinary] = useState(''); // Binary representation of the input
  const [swappedBinary, setSwappedBinary] = useState(''); // Binary after swapping the bits
  const [binaryToTextConversion, setBinaryToTextConversion] = useState(''); // Text converted back from the swapped binary
  const [preCaesarCipher, setPreCaesarCipher] = useState(''); // Text before Caesar cipher operation
  const [postCaesarCipher, setPostCaesarCipher] = useState(''); // Text after Caesar cipher operation

  // Function to convert text to binary
  const textToBinary = (text: string) => {
    // Convert each character to its binary representation, then join them into a string
    const binary = text.split('').map(char => ('00000000' + char.charCodeAt(0).toString(2)).slice(-8)).join(' ');
    setBinary(binary); // Store the binary representation in state
    return binary; // Return the binary representation
  };

  // Function to swap binary
  const swapBinary = (binary: string) => {
    // Swap the bits of each byte (group of 8 bits), then join them into a string
    const swapped = binary.split(' ').map(byte => byte.split('').reverse().join('')).join(' ');
    setSwappedBinary(swapped); // Store the swapped binary in state
    return swapped; // Return the swapped binary
  };

  // Function to convert binary back to text
  const binaryToText = (binary: string) => {
    // Convert each byte to its corresponding character, then join them into a string
    const text = binary.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
    setBinaryToTextConversion(text); // Store the converted text in state
    return text; // Return the converted text
  };

  // Function for Caesar cipher
  const caesarCipher = (text: string, shift: number) => {
    // Shift each character by the specified amount
    return text.split('').map(char => {
      const charCode = char.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) { // If the character is a capital letter
        return String.fromCharCode((charCode - 65 + shift + 26) % 26 + 65);
      } else if (charCode >= 97 && charCode <= 122) { // If the character is a lowercase letter
        return String.fromCharCode((charCode - 97 + shift + 26) % 26 + 97);
      }
      return char; // If the character is not a letter, return it as it is
    }).join('');
  };

  // Function to handle encryption
  const handleEncrypt = () => {
    const caesarEncrypted = caesarCipher(input, shift); // Apply Caesar cipher
    setPreCaesarCipher(caesarEncrypted); // Store the Caesar encrypted text in state
    const binary = textToBinary(caesarEncrypted); // Convert the text to binary
    const swappedBinary = swapBinary(binary); // Swap the binary
    const text = binaryToText(swappedBinary); // Convert the binary back to text
    setPostCaesarCipher(text); // Store the final encrypted text in state
    setOutput(text); // Set the final output
  };

  // Function to handle decryption
  const handleDecrypt = () => {
    const binary = textToBinary(input); // Convert the text to binary
    const swappedBinary = swapBinary(binary); // Swap the binary
    const text = binaryToText(swappedBinary); // Convert the binary back to text
    setPreCaesarCipher(text); // Store the text in state before applying Caesar cipher
    const decrypted = caesarCipher(text, -shift); // Apply Caesar cipher in reverse
    setPostCaesarCipher(decrypted); // Store the decrypted text in state
    setOutput(decrypted); // Set the final output
  };

  const handleSubmit = () => {
    if (operation === "encrypt") {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl variant='standard'>
          <InputLabel id='operation'>Operation</InputLabel>
          <Select
            labelId='operation'
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
          >
            <MenuItem value='encrypt'>Encrypt</MenuItem>
            <MenuItem value='decrypt'>Decrypt</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label='Input'
          multiline
          rows={4}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <TextField
          label='Shift'
          type='number'
          value={shift}
          onChange={(event) => setShift(parseInt(event.target.value))}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <Typography variant='body1'>Text to Binary: {binary}</Typography>
        <Typography variant='body1'>Swapped Binary: {swappedBinary}</Typography>
        <Typography variant='body1'>
          Binary to Text: {binaryToTextConversion}
        </Typography>
        <Typography variant='body1'>
          Pre-Caesar Cipher: {preCaesarCipher}
        </Typography>
        <Typography variant='body1'>
          Post-Caesar Cipher: {postCaesarCipher}
        </Typography>

        <TextField label='Output' multiline rows={4} value={output} />
      </Box>
    </Container>
  );
};

export default App;
