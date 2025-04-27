const email = localStorage.getItem('email');
const passwd = localStorage.getItem('passwd');
const logoutBtn = document.getElementById('logoutBtn');

const body = document.body;

if (!email && !passwd) {
    window.location.href = '/';
} else {


const darkRadio = document.getElementById('dark');
const lightRadio = document.getElementById('light');
const systemRadio = document.getElementById('default');


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


                fetch('/dataRetreiver', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email
                    }),
                })

                    .then((response) => response.json())
                    .then((data) => {

                    const theme = data.theme;

                    if (theme == 'dark') {
                        body.classList.add('dark');

                        darkRadio.checked = true;

                    } else if (theme == 'light') {
                        body.classList.add('light');

                        lightRadio.checked = true;
                        
                    } else if (theme == 'lightOS' || theme == 'darkOS') {

                        systemRadio.checked = true;

                        const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                        const iTheme = themeQuery.matches ? 'dark' : 'light';

                        if (iTheme == 'dark') {
                            body.classList.add('dark');

                        } else if (iTheme == 'light') {
                            body.classList.add('light');
                        }
                    }

                    })
                    .catch((error) => error)


const usr = localStorage.getItem('usr');

const p1 = document.getElementById('p1');
p1.textContent = `Username: ${usr}`;

const p2 = document.getElementById('p2');
p2.textContent = `Email Adress: ${email}`;

const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const iTheme = themeQuery.matches ? 'dark' : 'light';


// systemRadio.checked = true;

const checker = localStorage.getItem('checker');

if (checker == 'dark') {
    darkRadio.checked = true;

} else if (checker == 'light') {
    lightRadio.checked = true;

} else if (checker == 'system') {
    systemRadio.checked = true;

    if (iTheme == 'dark') {
        body.classList.add('dark');
    } else if (iTheme == 'light') {
        body.classList.add('light');
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



function theme (color) {

    if (localStorage.getItem('theme') !== color) {
        
        localStorage.setItem('theme', color);
        window.location.reload();
    }

    fetch('/dataReceiver', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usr: usr,
            theme: color
        }),
    })

    .then((response) => response.text())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.error("Error:", error));

    window.location.reload();
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



logoutBtn.addEventListener('click', () => {

    setTimeout(() => {
        localStorage.clear('email');
        localStorage.clear('passwd');
        localStorage.clear('usr');
        window.location.reload();
    }, 320)
})



} else {
    console.log('nuhuh');
}
})
.catch((error) => console.error("Error:", error));





document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default navigation

        document.getElementById('tst').classList.remove('tst');
        document.getElementById('tst').classList.add('tst2');
        document.querySelector('.tst-title').classList.add('link-title');
        
        const targetUrl = this.getAttribute('data-href');
        this.classList.add('animate');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);

    });
});








}