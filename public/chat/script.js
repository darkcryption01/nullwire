const email = localStorage.getItem('email');

let usr69;

let credToSend;

if (!email) {
    usr69 = localStorage.getItem('usr');
    credToSend = usr69;
} else {
    credToSend = email;
}

const passwd = localStorage.getItem('passwd');
// const txt1 = document.getElementById('txt1');
const txt = document.getElementById('txt');
const container0 = document.getElementById('container0');
const container1 = document.getElementById('container1');
const container69 = document.getElementById('container69');
const container = document.getElementById('container');
const topDiv = document.getElementById('topDiv');


if (!email && !passwd) {
    window.location.href = '/';
} else {

    fetch('/validator', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: credToSend,
            passwd: passwd
        }),
    })

        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data == 'success') {

                // fetch to get
                //usr and other stuff

                fetch('/dataRetreiver', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credToSend
                    }),
                })

                    .then((response) => response.json())
                    .then((data) => {

                        // main bakchodi
                        const email0 = data.email;
                        const usr0 = data.usr;

                        if (usr0) {
                        localStorage.setItem('usr', usr0);
                        const usr = localStorage.getItem('usr');

                        } else if (email0) {
                            localStorage.setItem('email', email0);
                        }
                        const theme = data.theme;
                        localStorage.setItem('theme', theme);
                        // const themeVar = localStorage.getItem('theme');
                        const body = document.body;

                        const usrs420 = data.usrs420;

                        // txt1.innerText = `welcome ${usr}`;

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




                        const socket = new WebSocket('wss://nullwire.us.to/ws');

                        socket.onopen = () => {
                            console.log('connected to webSocket');


                                console.log('Sending data to server');

                                socket.send(JSON.stringify({
                                    usr: usr
                                }));


                        }




                        const existingValues = new Set();
                        let i = 0;

                        // alert(usrs420);

                        if (!usrs420) {
                            // alert('no friends :(');

                            container0.style.display = 'none';

                            const anotherContainer = document.getElementById('anotherContainer');

                        const noFriendsTxt = document.createElement('p');
                        noFriendsTxt.textContent = 'No Friends :(';
                        anotherContainer.appendChild(noFriendsTxt);

                    }

                        while (i < usrs420.length) {

                            const usrs69 = usrs420[i];

                            if (usrs69.trim() === "") {
                                i++;
                                continue;
                            }

                            if (!existingValues.has(usrs69)) {

                                existingValues.add(usrs69);



                                const cdiv = document.createElement('div');

                                container0.appendChild(cdiv);

                                document.querySelectorAll('.container').forEach(element => {
                                    element.style.display = 'none';
                                });

                                cdiv.classList.add('cdiv');
                                let usrs72 = Array.from(usrs69);
                                
                                usrs72[0] = usrs72[0].toUpperCase();
                                usrs72 = usrs72.join("");

                                // if (!usrs72) {
                                //     alert('no friends :(');
                                // }
                               
                                // alert(usrs72);

                                cdiv.textContent = usrs72;

                                cdiv.addEventListener('click', () => {

                                    localStorage.setItem('currentUsr', cdiv.textContent);

                                    window.location.href = '../messages';

                                    // container1.style.display = 'block';

                                    // txt.style.display = 'none';
                                    // const hd1 = document.getElementById('hd1');
                                    // hd1.style.display = 'none';
                                    // container0.style.display = 'none';
                                    // const bkc = document.querySelector('.bottomDiv')
                                    // bkc.style.display = 'none'
                                    // topDiv.style.display = 'flex';
                                    // topDiv.style.alignItems = 'center';

                                    // topDiv.style.border = '1px solid black';


                                      });      //here the loop of cdiv ends
                                i++;
                            }
                        }


                        

                        socket.onmessage = (event) => {
                            console.log(`message from server: ${event.data}`);
                            // alert(event.data);
                            // tmp refPF logic
                            const data = JSON.parse(event.data);
                            const reqPF = data.reqPF
                            // const msg = data.msg;

                             if (reqPF) {

                                container69.style.display = 'block';
                                container69.textContent = reqPF;

                                setTimeout( () => {
                                   container69.style.display = 'none';
                                }, 2000)
                            }


                            //can add p via loop in msgDiv
                            // if (msg) {
                            // msgDiv.textContent = msg;
                            // alert(msg);
                        // }

                        }

                        socket.onclose = () => {
                            console.log('connection closed');
                        }

                        socket.onerror = (error) => {
                            console.error('WebSocket Error:', error);
                        };





                    })
                    .catch((error) => console.error("Error:", error));






            } else {
                window.location.href='/';
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

function redirect(dir) {
    window.location.href = `/${dir}`;
}
