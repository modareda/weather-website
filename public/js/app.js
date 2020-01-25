const forecastForm = document.querySelector('form');
const searchInput = document.querySelector('.input');
const messageOne = document.querySelector('#error');
const messageTwo = document.querySelector('#data');



forecastForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    e.preventDefault();
    fetch(`/weather?address=${searchInput.value}`).then((res) => {

    res.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent =  data.forecast;
        }
    })
})
})

