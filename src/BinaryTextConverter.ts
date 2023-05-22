const BinaryTextConverter = {
    textToBinary: (text: string): string => {
      let binary = '';
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode === 32) { // Handle space character
          binary += '00100000'; // ASCII code for space
        } else if (charCode >= 33 && charCode <= 126) { // Handle special characters
          binary += charCode.toString(2).padStart(8, '0');
        } else {
          console.log(`Cannot convert character "${text[i]}" to binary.`);
        }
      }
      return binary;
    },
  
    binaryToText: (binary: string): string => {
        let text = '';
        for (let i = 0; i < binary.length; i += 8) {
          const binaryChar = binary.substr(i, 8);
          const charCode = parseInt(binaryChar, 2);
          if ((charCode >= 32 && charCode <= 126) || (charCode >= 160 && charCode <= 255)) {
            text += String.fromCharCode(charCode);
          } else {
            console.log(`Cannot convert binary "${binaryChar}" to text.`);
          }
        }
        return text;
      },
      
  
    swapBinary: (binary: string): string => {
        const binaryArr = binary.split('');
        for (let i = 0; i < binaryArr.length; i++) {
          if (i % 2 === 0 && i !== binaryArr.length - 1) {
            const temp = binaryArr[i];
            binaryArr[i] = binaryArr[i + 1];
            binaryArr[i + 1] = temp;
          }
        }
        return binaryArr.join('');
      },
      
  
    caesarCipherEncrypt: (text: string, shift: number): string => {
      let encryptedText = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[A-Z]/i)) { // Check if character is alphabetical
          const isUpperCase = char === char.toUpperCase();
          const charCode = char.toUpperCase().charCodeAt(0);
          const shiftedCharCode = ((charCode - 65 + shift) % 26) + 65;
          const encryptedChar = isUpperCase
            ? String.fromCharCode(shiftedCharCode)
            : String.fromCharCode(shiftedCharCode).toLowerCase();
          encryptedText += encryptedChar;
        } else {
          encryptedText += char;
        }
      }
      return encryptedText;
    },
  
    caesarCipherDecrypt: (text: string, shift: number): string => {
      let decryptedText = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[A-Z]/i)) { // Check if character is alphabetical
          const isUpperCase = char === char.toUpperCase();
          const charCode = char.toUpperCase().charCodeAt(0);
          const shiftedCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
          const decryptedChar = isUpperCase
            ? String.fromCharCode(shiftedCharCode)
            : String.fromCharCode(shiftedCharCode).toLowerCase();
          decryptedText += decryptedChar;
        } else {
          decryptedText += char;
        }
      }
      return decryptedText;
    },
  };
  
  export default BinaryTextConverter;
  