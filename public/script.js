const email = localStorage.getItem('email');
const passwd = localStorage.getItem('passwd');
const logo = document.getElementById('logo');
const wlcmTxt = document.getElementById('wlcmTxt');

if (email && passwd) {

    wlcmTxt.innerText = 'Please Wait...';
    
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
            if (data == 'success') {
                window.location.href = 'chat/';

            } else if (data == 'emailNotExist') {
                localStorage.clear('email');
                localStorage.clear('passwd');

                window.location.href = './';
                
                wlcmTxt.innerText = 'Welcome';
    
            }
        })
        .catch((error) => error)

} else {

    const body = document.body;

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const iTheme = themeQuery.matches ? 'dark' : 'light';

    const darkRadio = document.getElementById('dark');
    const lightRadio = document.getElementById('light');
    const systemRadio = document.getElementById('default');

    systemRadio.checked = true;

    const checker = localStorage.getItem('checker');

    if (checker == 'dark') {
        darkRadio.checked = true;
        logo.src = 'images/logo1.png'

    } else if (checker == 'light') {
        lightRadio.checked = true;
        logo.src = 'images/logo.png'

    } else if (checker == 'system') {
        systemRadio.checked = true;

        if (iTheme == 'dark') {
            body.classList.add('dark');
            logo.src = 'images/logo1.png';

        } else if (iTheme == 'light') {
            body.classList.add('light');
            logo.src = 'images/logo.png';
        }
        
    }


    darkRadio.addEventListener('change', () => {
        theme('dark');
        darkRadio.checked = true;
        localStorage.setItem('checker', 'dark')
    });

    lightRadio.addEventListener('change', () => {
        theme('light');
        lightRadio.checked = true;
        localStorage.setItem('checker', 'light');
    });

    systemRadio.addEventListener('change', () => {
        if (iTheme == 'dark') {
            theme('darkOS');
            systemRadio.checked = true;
            localStorage.setItem('checker', 'system');

        } else if (iTheme == 'light') {
            theme('lightOS');
            systemRadio.checked = true;
            localStorage.setItem('checker', 'system');
        }
    });

    function theme(color) {
        if (localStorage.getItem('theme') !== color) {

            localStorage.setItem('theme', color);
            window.location.reload();
        }
    }

    const themeVar = localStorage.getItem('theme');

    if (themeVar == 'dark') {
        body.classList.add('dark');

    } else if (themeVar == 'light') {
        body.classList.add('light');

    } else if (themeVar == 'darkOS') {
        body.classList.add('dark');

    } else if (themeVar == 'lightOS') {
        body.classList.add('light');

    } else if (!themeVar) {

        if (iTheme == 'dark') {
            body.classList.add('dark');

        } else if (iTheme == 'light') {
            body.classList.add('light');

        }
    }
}
