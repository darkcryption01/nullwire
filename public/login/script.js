const btn = document.getElementById('btn');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');

const loader = document.getElementById('loader');
const pS = document.getElementById('pS');

const lEmail = localStorage.getItem('email');
//const lUsr = localStorage.getItem('usr');
const lPasswd = localStorage.getItem('passwd');

if (lEmail && lPasswd) {

	document.getElementById('h1').innerText = 'Please Wait...';

    fetch('/validator', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: lEmail,
            passwd: lPasswd
        }),
    })

        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data == 'success') {
                window.location.href = '../chat/';

            } else if (data == 'emailNotExist') {
                localStorage.clear('email');
                localStorage.clear('passwd');

		window.location.href = './';

		document.getElementById('h1').innerText = 'Sign In';

            }
        })
        .catch((error) => error)

} else {

let checker;


btn.addEventListener('click', () => {
    mainFunc();
})

document.getElementById('passwd').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        mainFunc();
    }
})

function mainFunc() {
    const email = document.getElementById('email').value;
    const passwd = document.getElementById('passwd').value;
    pS.style.display = 'none';
    loader.style.display = 'block';

    btn.style.backgroundColor = '#101010';


    setTimeout(() => {
        btn.style.backgroundColor = '#151717'
    }, 200)

    if (!email) {
	    emailErr.style.display = 'block';
        emailErr.innerText = 'Email is empty';
        checker = 400;
	    loader.style.display = 'none';
	    pS.style.display = 'block';

    } else if (email) {
	    emailErr.style.display = 'none';
        checker = 200;

        if (email.split("").includes("@")) {
        localStorage.setItem('email', email)
        } else {
            localStorage.setItem('usr', email)
        }
    }

    if (!passwd) {
	    passErr.style.display = 'block';
        passErr.innerText = 'Password is empty'
        checker = 400;
	    loader.style.display = 'none';
        pS.style.display = 'block';

    } else if (passwd) {
	    passErr.style.display = 'none';
        checker = 200;
        localStorage.setItem('passwd', passwd);
    }



    if (checker === 400) {
        console.log('400');
    } else if (checker === 200) {

        fetch('/validator', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                passwd: passwd
            }),
        })

        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data == 'emailNotExist') {
		emailErr.style.display = 'block';
		emailErr.innerText = 'Account does not exist';
		loader.style.display = 'none';
	        pS.style.display = 'block';

            } else if (data == 'invalidPsswd') {
		passErr.style.display = 'block';
		passErr.innerText = 'Password is incorrect';
		loader.style.display = 'none';
	        pS.style.display = 'block';

            } else if (data == 'success') {
                window.location.href = '/chat/';

            }            
               
        })
        .catch((error) => console.error("Error:", error));
        
    }
 }




}

