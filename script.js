const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const result = document.getElementById("result");

fetch("https://api.frankfurter.app/currencies")
    .then((data) => data.json())
    .then((data) => {
        display(data);
    });

function display(data) {
    const entries = Object.entries(data);
    for (var i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
}

btn.addEventListener("click", () => {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = input.value;
    if (currency1 !== currency2) {
        convert(currency1, currency2, value);
    } else {
        alert("Choose Different Currencies !!!");
    }
});

function convert(currency1, currency2, value) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(Object.values(data.rates)[0]);
            // Assuming 'result' is an input element, use 'value' property to set its value
            result.value = Object.values(data.rates)[0];
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

