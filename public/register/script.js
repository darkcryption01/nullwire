const btn = document.getElementById('btn');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');
const usrErr = document.getElementById('usrErr');

const loader = document.getElementById('loader');
const pS = document.getElementById('pS');

btn.addEventListener('click', () => {

    mainFunc();

});


document.getElementById('passwd').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        mainFunc();
    }
})


   function mainFunc() {
    const email = document.getElementById('email').value.trim();
    const passwd = document.getElementById('passwd').value.trim();
    const usr = document.getElementById('usr').value.trim();


    btn.style.backgroundColor = '#101010';


    setTimeout(() => {
        btn.style.backgroundColor = '#151717'
    }, 200)


    let isValid = true;

    // Reset Error Messages
    emailErr.style.display = 'none';
    passErr.style.display = 'none';
    usrErr.style.display = 'none';

    // Show Loader
    pS.style.display = 'none';
    loader.style.display = 'block';
    btn.style.backgroundColor = '#101010';

    setTimeout(() => {
        btn.style.backgroundColor = '#151717';
    }, 200);

    // Email Validation
    const emailPattern = /^.{1,}@.{1,20}\.[^.]{1,10}$/;
    if (!email) {
        emailErr.style.display = 'block';
        emailErr.innerText = 'Email is empty';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailErr.style.display = 'block';
        emailErr.innerText = 'Enter a valid email';
        isValid = false;
    }

    // Password Validation
    const passwordPattern = /^(?=.*\d).{8,}$/;
    if (!passwd) {
        passErr.style.display = 'block';
        passErr.innerText = 'Password is empty';
        isValid = false;
    } else if (!passwordPattern.test(passwd)) {
        passErr.style.display = 'block';
        passErr.innerText = 'Password must contain at least 8 characters and a number';
        isValid = false;
    }

    // Username Validation
    const usrPattern = /^[a-zA-Z0-9\-_#]{1,12}$/;
    if (!usr) {
        usrErr.style.display = 'block';
        usrErr.innerText = 'Username is empty';
        isValid = false;
    } else if (!usrPattern.test(usr)) {
        usrErr.style.display = 'block';
        usrErr.innerText = 'Username can only contain - _ # symbols and be of max 12 characters.';
        isValid = false;
    }

    // If Validation Fails
    if (!isValid) {
        loader.style.display = 'none';
        pS.style.display = 'block';
        return;
    }

    // Send Data to Server
    fetch('/checker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            usr: usr,
        }),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === 'emailAlreadyExist') {
                emailErr.style.display = 'block';
                emailErr.innerText = 'An account with this email already exists';
                isValid = false;
            } else if (data === 'usrAlreadyExist') {
                usrErr.style.display = 'block';
                usrErr.innerText = 'This username is taken';
                isValid = false;
            } else if (data === 'ok') {
                localStorage.setItem('email', email);
                localStorage.setItem('usr', usr);
                localStorage.setItem('passwd', passwd);
                window.location.href = '../verify';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            loader.style.display = 'none';
            pS.style.display = 'block';
        });

   }
