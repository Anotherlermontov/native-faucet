INPUT_AMOUNT_FIELD_MAIN_NUMBERS = '';
INPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = '';
OUTPUT_AMOUNT_FIELD_MAIN_NUMBERS = '';
OUTPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = '';

function formatAmountInput(decimals, isInput) {
    const tokenAmountInput = document.getElementById(isInput === true ? 'token-amount' : 'token-amount-output');
    tokenAmountInput.addEventListener('input', (event) => {
        previousMainNumbers = isInput ? INPUT_AMOUNT_FIELD_MAIN_NUMBERS : OUTPUT_AMOUNT_FIELD_MAIN_NUMBERS;
        previousDecimalsNumbers = isInput ? INPUT_AMOUNT_FIELD_DECIMAL_NUMBERS : OUTPUT_AMOUNT_FIELD_DECIMAL_NUMBERS;
        let value = event.target.value;

        value = value.replace('.', ',');

        // Remove invalid characters
        value = value.replace(/[^0-9,]/g, '');

        // Ensure only one decimal point
        let parts = value.split(',');
        if (parts.length > 2) {
            parts = [previousMainNumbers, previousDecimalsNumbers]
            value = `${parts[0]},${parts[1]}`;
        }

        // Limit decimal
        if (parts[1] && parts[1].length > decimals) {
            console.log(previousDecimalsNumbers.length - parts[1].length, previousDecimalsNumbers.length - parts[1].length === 1);
            if (parts[1].length - previousDecimalsNumbers.length === 1) {
                parts[1] = previousDecimalsNumbers;
                value = `${parts[0]},${parts[1]}`;
            } else {
                value = `${parts[0]}${parts[1]}`;
                parts[1] = ''
            }
        }

        // Update the input field with the formatted value
        event.target.value = value;
        if (isInput === true) {
            INPUT_AMOUNT_FIELD_MAIN_NUMBERS = parts[0];
        } else {
            OUTPUT_AMOUNT_FIELD_MAIN_NUMBERS = parts[0];
        }
        if (parts[1]) {
            if (isInput === true) {
                INPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = parts[1];
            } else {
                OUTPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = parts[1];
            }
        } else {
            if (isInput === true) {
                INPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = '';
            } else {
                OUTPUT_AMOUNT_FIELD_DECIMAL_NUMBERS = '';
            }
        }
    });

    tokenAmountInput.addEventListener('blur', () => {
        const value = tokenAmountInput.value;
        if (value === '' || value === '0' || isNaN(parseFloat(value))) {
            tokenAmountInput.value = '';
        }
    });
}
