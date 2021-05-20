let stack = [];

const transformInput = (data) => {
    return data.toString().trim();
}

const validateInput = (input) => {
    const regex = /[^0-9\-.*+\s\/]/;
    if (input.match(regex))
        return false;
    return true;
}

const calculate = (operator) => {
   const operand1 = stack.pop();
   const operand2 = stack.pop();
   if (operator == '+') {
       stack.push(operand2 + operand1);
    } else if (operator == '*') {
       stack.push(operand1 * operand2);
    } else if (operator == '-') {
       stack.push(operand2 - operand1);
    } else {
        if (operand1 == 0) {
            process.stdout.write(`Error: Divided by zero.  Reset input`);
            stack = [];
        }
        stack.push(operand2 / operand1);
    }
}
const processing = (input) => {

    let temp = input.split(' ');
    for(let i=0; i < temp.length; i++) {
        if (temp[i].match(/[^-*+\/]/)) {
            stack.push(parseFloat(temp[i]));
        } else {
            calculate(temp[i]);       
        }
    }
}

process.stdin.on('data', function (data) {
    data = transformInput(data);
    if (validateInput(data)) {
        processing(data);
        console.log(stack);
        process.stdout.write(`${stack[stack.length-1]} \n`);
    } else {
        process.stdout.write(`Please enter valid input  \n`);
    }
});


