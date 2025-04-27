const email = localStorage.getItem('email');
const passwd = localStorage.getItem('passwd');
const usr = localStorage.getItem('usr');
const txt = document.getElementById('txt');
const btn = document.getElementById('btn');


const codeInput = document.getElementById('codeInput');

codeInput.addEventListener('input', () => {

    if (codeInput.value.length > 6) {
        codeInput.value = codeInput.value.slice(0, 6);
    }
})

//req to mail bot
if (!localStorage.getItem('emailSent') && email) {
    fetch('/mail', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailSend: email,
        }),
    })

    .then((response) => response.text())
    .then((data) => {
        console.log(data)
        localStorage.setItem('emailSent', 'yep');
    })
    .catch((error) => console.error("Error:", error));
}



txt.innerText = `Enter the code sent to ${email}`;

btn.addEventListener('click', () => {
    const codeInput = document.getElementById('codeInput').value;

//req to mail bot
if (email) {
    fetch('/otp', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codeInput: codeInput
        }),
    })

    .then((response) => response.text())
    .then((data) => {
        console.log(data);

        if (data == 'valid') {
            txt.innerText = 'please wait...';

            /* SEND THE REQ TO DB */
            fetch('/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usr: usr,
                    email: email,
                    passwd: passwd
                }),
            })
        
            .then((response) => response.text())
            .then((data) => {
                console.log(data);

                if (data == 'nice try diddy') {
                    alert('nice try diddy');
                    console.log('nice try diddy');
                }

                if (data == 'ok') {

                    alert('Account has been created.')

                    localStorage.removeItem(email);
                    localStorage.removeItem(passwd);
                    localStorage.removeItem(usr);

                    window.location.href = '../login';
              }
            })
            .catch((error) => console.error("Error:", error));
        

        } else {
            alert('code is invalid');
        }

    })
    .catch((error) => console.error("Error:", error));
}
}) 
