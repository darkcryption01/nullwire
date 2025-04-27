// what the fuck is even code readability


const email = localStorage.getItem('email');
const passwd = localStorage.getItem('passwd');
const usr = localStorage.getItem('usr');

if (!email && !passwd) {
    window.location.href = '/';
} else {

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
            console.log(data + ': account validation');
            if (data == 'success') {

    // theme bakchodi

const body = document.body;

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

                } else if (theme == 'light') {
                    body.classList.add('light');
                    
                } else if (theme == 'lightOS' || theme == 'darkOS') {

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




let existingValues0;

const hmm = document.getElementById('hmm');

if (usr) {
document.getElementById('ok').addEventListener('click', () => {

    const usrs = document.getElementById('usrs').value;
     

    const socket = new WebSocket('ws://localhost:7272/ws');


    socket.onopen = () => {
    console.log('connected to webSocket');

        console.log('Sending data to server');

        socket.send(JSON.stringify({
            usr: usr,
            usrs: usrs,
        }));

        displayPendingReq();

        // alert('sent');
        // window.location.reload();
}

socket.onmessage = (event) => {
    console.log(`message from server: ${event.data}`);

    // alert(event.data);

    if (event.data === "exists") {
        window.location.reload();
    } else if (event.data === "notExists") {
        alert("The user does not exist");
    }

}

socket.onclose = () => {
    console.log('connection closed');
}

socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};



})




/**#*hdhdhshhshshshhshshsh */


function displayPendingReq() {
     fetch('/chut', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usr: usr,
            mode: 'pt'
        }),
    })

    .then((response) => response.json())
    .then((data) => {

        if (data.no == 'no') {
            hmm.innerText = 'no outgoing reqs';
            console.log('no, no outgoing requests');
        } else {

        const reqPF = data.reqPT;
        
        console.log(reqPF);

        let i = 0;

        // while loop (dont fuck up)
        while (i < reqPF.length) {

            const PF = reqPF[i];

            if (PF.trim() === "") {
                i++;
                continue; // Skip empty string
                }

                if (existingValues0 !== PF) {

                    existingValues0 = PF;

                    const cdiv = document.createElement('div');
                    cdiv.style.height =  '50px';
                    cdiv.style.width = '250px';
                    cdiv.style.backgroundColor = 'yellow';
                    cdiv.style.margin = '5px';
                    cdiv.textContent = `${PF}`;

                container.appendChild(cdiv);



                const cbtn2 = document.createElement('button');
                cdiv.appendChild(cbtn2);
                cbtn2.textContent = 'n';
                cbtn2.style.position = 'absolute';
                cbtn2.style.left = '200px';

                
                cbtn2.addEventListener('click',() => {
                    const cUsr = cbtn2.parentElement.textContent.slice(0, -1);
                    cbtn2.parentElement.style.display = 'none';
                    // alert('no');

                    if (usr && cUsr) {
                    fetch('/chutHandler', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            usr: cUsr,
                            usrs: usr,
                            ans: 'no'
                        }),
                    })
                
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((error) => console.error("Error:", error));
                }   
                
                })




                console.log(`added: ${PF}`)

                } else {
                    console.log(`skipped: ${PF}`);
                }
            
                
            console.log(`ok: ${PF}`)

            i++;
        }


        }
    })
    .catch((error) => console.error("Error:", error));

}

/*dyyeyeyryryuru3y3yehhehehehhehe*/





} else if (!usr) {
    alert('calm tf out');
}


function redirect(dir) {
    window.location.href = `/${dir}`;



}

const newBtn = document.getElementById('newBtn');
const txt = document.getElementById('txt');
const container = document.getElementById('container');
let existingValues;
const btn69 = document.getElementById('btn69');

displayPendingReq();
displayIncomingReq();
btn69.onclick = displayPendingReq;
newBtn.onclick = displayIncomingReq;



function displayIncomingReq () {
    fetch('/chut', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usr: usr,
            mode: 'pf'
        }),
    })

    .then((response) => response.json())
    .then((data) => {

        if (data.no == 'no') {
            hmm.innerText = 'no incoming reqs';
            console.log('no2, no incoming requests');
        } else {

        const reqPF = data.reqPF;
        
        console.log(reqPF);

        let i = 0;

        // while loop (dont fuck up)
        while (i < reqPF.length) {

            const PF = reqPF[i];

            if (PF.trim() === "") {
                i++;
                continue; // Skip empty string
                }


                if (existingValues !== PF) {

                    existingValues = PF;

                    const cdiv = document.createElement('div');
                    cdiv.style.height =  '50px';
                    cdiv.style.width = '250px';
                    cdiv.style.backgroundColor = 'green';
                    cdiv.style.margin = '5px';
                    cdiv.textContent = `${PF}`;

                container.appendChild(cdiv);


                const cbtn = document.createElement('button');
                cdiv.appendChild(cbtn);
                cbtn.textContent = 'y';
                cbtn.style.position = 'absolute';
                cbtn.style.left = '160px';


                const cbtn2 = document.createElement('button');
                cdiv.appendChild(cbtn2);
                cbtn2.textContent = 'n';
                cbtn2.style.position = 'absolute';
                cbtn2.style.left = '200px';



                cbtn.addEventListener('click', () => {
                    const cUsr = cbtn.parentElement.textContent.slice(0, -2);
                    cbtn.parentElement.style.display = 'none';
                    alert('yes');


                    if (usr && cUsr) {
                    fetch('/chutHandler', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            usr: usr,
                            usrs: cUsr,
                            ans: 'yes'
                        }),
                    })
                
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((error) => console.error("Error:", error));
                } 

                })


                
                cbtn2.addEventListener('click',() => {
                    const cUsr = cbtn2.parentElement.textContent.slice(0, -2);
                    cbtn2.parentElement.style.display = 'none';
                    alert('no');

                    if (usr && cUsr) {
                    fetch('/chutHandler', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            usr: usr,
                            usrs: cUsr,
                            ans: 'no'
                        }),
                    })
                
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((error) => console.error("Error:", error));
                }   
                
                })




                console.log(`added: ${PF}`)

                } else {
                    console.log(`skipped: ${PF}`);
                }
            
                
            console.log(`ok: ${PF}`)

            i++;
        }


        }
    })
    .catch((error) => console.error("Error:", error));

}

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
