let output = "";
let result = document.getElementById("result");

let latestResult = document.getElementById("latestResult");

const buttons = document.querySelectorAll("button.button__input");
const operators = ["+", "-", "*", "/", "%", "="];

const addToLocalStorage = () => {
    localStorage.setItem("data", result.value);
    console.log(result.value);
};

const calculate = inputValue => {
    if(inputValue === "=" && output !== ""){
        if(output.slice(-1) === "-"){
            output = eval(output.replace(/[-]{2,}|[+]{2,}|[/]{2,}/g, '+'));
        }

        output = eval(output);
        addToLocalStorage(output);
        latestResult.innerHTML += "<li>" + output + "</li>";

        try {
            if(!isFinite(output)){
                output = "Can't div by 0!";
                throw new Error("Canno't divide by 0!");
            }
        } catch (error) {
            console.error("Erorr:", error);
        }

    } else if (inputValue === "C"){
        output = "";
    } else if (inputValue === "DEL"){
        output = output.slice(0, -1);
    } else if (operators.includes(inputValue) && output === ""){
        output = "";
    } else {
        output += inputValue;
    }

    result.value = output;
};

buttons.forEach((button) => button.addEventListener("click", (e) => {
    calculate(e.target.dataset.value);
}));