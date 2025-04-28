const title = document.getElementById('title');

// ok
const msgStatusTxt = document.getElementById('msgStatusTxt');

const theme = localStorage.getItem('theme');
const body = document.body;

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


const topDiv = document.getElementById('topDiv');
const container1 = document.getElementById('container1');
const usr = localStorage.getItem('usr');



const currentUsr = localStorage.getItem('currentUsr');



const socket = new WebSocket('wss://nullwire.us.to/wsMsg');

socket.onopen = () => {
    console.log('connected to webSocket 1');


        // console.log('Sending data to server');

        socket.send(JSON.stringify({
            usr: usr,
            usrs: currentUsr.toLowerCase()
        }));


}


title.textContent = currentUsr;

const backBtn = document.createElement('button');
// backBtn.style.marginLeft = '20%';
backBtn.style.position = 'absolute';
backBtn.style.left = '5%';
backBtn.innerText = 'b';
backBtn.addEventListener('click', () => {
    window.location.href = '../chat';
})

topDiv.appendChild(backBtn);

const msgDiv = document.createElement('div');
msgDiv.style.height = '640px';
msgDiv.style.width = '100%';
// msgDiv.style.backgroundColor = 'red';
msgDiv.style.overflow = 'auto';

container1.appendChild(msgDiv);


const plchldr = document.createElement('input');
plchldr.type = 'text';
plchldr.style.height = '40px';
plchldr.style.width = '80%';
plchldr.style.position = 'absolute';
plchldr.style.bottom = '5%';

const whichUsrs = currentUsr;

const sigma = document.createElement('p');
sigma.textContent = whichUsrs;
// sigma.style.left = '50%';
// sigma.style.top = '40%';
// sigma.style.transform = 'translateX(50%)';
// sigma.style.transform = 'translateY(-10%)';
// sigma.style.marginRight = '10%';
// sigma.style.marginBottom = '50%';


const sigmaBtn = document.createElement('button');
sigmaBtn.textContent = 'send';
sigmaBtn.style.height = '45px';
sigmaBtn.style.width = '65px';
sigmaBtn.style.position = 'absolute';
sigmaBtn.style.bottom = '5%';
sigmaBtn.style.right = '0%';



sigmaBtn.addEventListener('click', () => {
    const plchldrValue = plchldr.value;
    const sP = document.createElement('p');
    const divP = document.createElement('div');
    
    const txt = document.createElement('p');


    // sigmaMsg.innerText = `me: ${plchldrValue}`;


    divP.classList.add('user1');

    sP.innerHTML = `<p>${plchldrValue}</p>`;
    sP.style.color = 'white';
    sP.style.width = 'fit-content'

    divP.style.backgroundColor = '#121212';
    divP.style.opacity = '0.75';
    divP.style.height = sP.style.height;
    divP.style.width = sP.style.width;
    divP.style.paddingLeft = '2px';
    divP.style.paddingRight = '4px';

    divP.style.borderRadius = '5px';
    divP.style.marginLeft = '75%';
    divP.style.marginTop = '6px';
    divP.style.paddingTop = '0.1px';
    divP.style.paddingBottom = '0.1px';


    const timeObj = new Date();

    // alert(timeObj.getMonth());

    const hmm = timeObj.getDay();
    const bruh = timeObj.getMonth();

    let day;
    let month;

    if (hmm === 0) {
        day = 'Sun';
    } else if (hmm === 1) {
        day = 'Mon';
    } else if (hmm === 2) {
        day = 'Tue';
    } else if (hmm === 3) {
        day = 'Wed';
    } else if (hmm === 4) {
        day = 'Thu';
    } else if (hmm === 5) {
        day = 'Fri';
    } else if (hmm === 6) {
        day = 'Sat';
    }


    if (bruh === 0) {
        bruh = 'Jan';
    } else if (bruh === 1) {
        month = 'Feb';
    } else if (bruh === 2) {
        month = 'Mar';
    } else if (bruh === 3) {
        month = 'Apr';
    } else if (bruh === 4) {
        month = 'May';
    } else if (bruh === 5) {
        month = 'Jun';
    } else if (bruh === 6) {
        month = 'Jul';
    } else if (bruh === 7) {
        month = 'Aug';
    } else if (bruh === 8) {
        month = 'Sep';
    } else if (bruh === 9) {
        month = 'Oct';
    } else if (bruh === 10) {
        month = 'Nov';
    } else if (bruh === 11) {
        month = 'Dec';
    }

    const fine = timeObj.getFullYear();
    const year = fine.toString().slice(2);


        txt.textContent = day + ', ' + timeObj.getDate() + ' ' + month + ' ' + year + ', ' + timeObj.getHours() + ':' + timeObj.getMinutes();




    divP.appendChild(sP);
    msgDiv.appendChild(divP);
    divP.parentElement.insertBefore(txt, divP);
    //paandu


    msgDiv.scrollTop = msgDiv.scrollHeight;


    socket.send(JSON.stringify({
        msg: plchldrValue,
        sendUsrs: whichUsrs,
        usr: usr //tmp bug fix (bug: toUpperCase(server))// nah its the that you must send it everytime
    }));


    plchldr.value = ''; // this way it only ressagins the value of that element.methof not judt whole element

})



topDiv.appendChild(sigma);
container1.appendChild(plchldr);
container1.appendChild(sigmaBtn);




// alert('test 1');

// fetch messages when clicked on div (static)
fetch('/msgRetreiver', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        usr: usr,
        usrs: whichUsrs
    }),
})

    .then((response) => response.json())
    .then((data) => {

        // alert("test2");

        document.querySelectorAll('.container2').forEach(element => {
            element.style.display = 'none';
        });

        // if (noMsg) {

        //     alert('no msgs');
            
        //     const noMsgP = document.createElement('p');
        //     noMsgP.innerText = 'No Messages :(';
        //     noMsgP.style.color = 'black';
        //     noMsgP.style.fontSize = '36px';
        //     noMsgP.style.textAlign = 'center';
        //     msgDiv.appendChild(noMsgP);
        // }


        //this holds msgs(bothSide), time and sentTo
        const allMessages = data.allMessages;

          if (!allMessages[0]) {
            // alert('no msg');

            const noMsgP = document.createElement('p');
            noMsgP.innerText = 'No Messages :(';
            noMsgP.style.color = 'black';
            noMsgP.style.fontSize = '36px';
            noMsgP.style.textAlign = 'center';
            msgDiv.appendChild(noMsgP);

          }


          // add the msgStatus here

        //   alert(allMessages[ allMessages.length - 1 ].status);

          // well this means that if the last
          // array is seen then the arrays followed
          // by it are also seen. hey wait~
          // add this in loop, the below loop
          // and add whats seen and unseen to messages


          // the above alert can be used in chat


          // actually wait loop over this shit
          // in the below loop to avoid mem overflow
          // look for the seen (the last) and mark seen
          // to that particular msg


          // to do so, this loop from end instead of from the beginning
          // which means you need to do i-- insead of i++;

          // let i = 50;

          // while (i > 0) {
          // console.log('1337');
          // i--;
          // }

// now all you need to is add the if 'seen' exists in the above example loop

let e = allMessages.length - 1;

// while (e > 0) {
//     //look for seen

//     if (allMessages[e].status === 'seen') {
//         // alert(allMessages[e].msg);

//         alert(allMessages[e].status + e);

//     const tst = document.getElementById(allMessages[e].id);

//     alert(tst.textContent);
        
//        msgStatusTxt.textContent = 'seen';  
//         break;
//     }

//     // if found then break
//     e--;
// }

        let a = 0;

        while (a < allMessages.length) {

            const sentToMsg = allMessages[a].sentTo;

            const sP = document.createElement('p');
            const divP = document.createElement('div');

            const txt = document.createElement('p');

            // alert(sentToMsg);
            // alert(whichUsrs);

            if (sentToMsg === whichUsrs.toLowerCase()) {

                // alert(sentToMsg);

                divP.id = allMessages[a].id;

                divP.classList.add('user1');

                sP.innerHTML = `<p>${allMessages[a].msg}</p>`
                sP.style.color = 'white';
                sP.style.width = 'fit-content'

                divP.style.backgroundColor = '#121212';
                divP.style.opacity = '0.75';
                divP.style.height = sP.style.height;
                divP.style.width = sP.style.width;
                divP.style.paddingLeft = '2px';
                divP.style.paddingRight = '4px';

                divP.style.borderRadius = '5px';
                divP.style.marginLeft = '75%';
                divP.style.marginTop = '6px';
                divP.style.paddingTop = '0.1px';
                divP.style.paddingBottom = '0.1px';

                const timeObj = new Date(allMessages[a].time);

                // alert(timeObj.getMonth());

                const hmm = timeObj.getDay();
                const bruh = timeObj.getMonth();

                let day;
                let month;

                if (hmm === 0) {
                    day = 'Sun';
                } else if (hmm === 1) {
                    day = 'Mon';
                } else if (hmm === 2) {
                    day = 'Tue';
                } else if (hmm === 3) {
                    day = 'Wed';
                } else if (hmm === 4) {
                    day = 'Thu';
                } else if (hmm === 5) {
                    day = 'Fri';
                } else if (hmm === 6) {
                    day = 'Sat';
                }


                if (bruh === 0) {
                    bruh = 'Jan';
                } else if (bruh === 1) {
                    month = 'Feb';
                } else if (bruh === 2) {
                    month = 'Mar';
                } else if (bruh === 3) {
                    month = 'Apr';
                } else if (bruh === 4) {
                    month = 'May';
                } else if (bruh === 5) {
                    month = 'Jun';
                } else if (bruh === 6) {
                    month = 'Jul';
                } else if (bruh === 7) {
                    month = 'Aug';
                } else if (bruh === 8) {
                    month = 'Sep';
                } else if (bruh === 9) {
                    month = 'Oct';
                } else if (bruh === 10) {
                    month = 'Nov';
                } else if (bruh === 11) {
                    month = 'Dec';
                }

                const fine = timeObj.getFullYear();
                const year = fine.toString().slice(2);


                txt.textContent = day + ', ' + timeObj.getDate() + ' ' + month + ' ' + year + ', ' + timeObj.getHours() + ':' + timeObj.getMinutes();

                // txt.textContent = allMessages[a].time;

            } else {

                divP.id = allMessages[a].id;

                divP.classList.add('user2');

                sP.innerHTML = `<p>${allMessages[a].msg}</p>`

                sP.style.color = 'white';
                sP.style.width = 'fit-content'


                divP.style.backgroundColor = '#121212';
                divP.style.opacity = '0.85';
                divP.style.height = sP.style.height;
                divP.style.width = sP.style.width;
                divP.style.paddingLeft = '2px';
                divP.style.paddingRight = '4px';
                divP.style.borderRadius = '4px';
                divP.style.marginLeft = '4px';
                divP.style.marginTop = '6px';
                divP.style.paddingTop = '0.1px';
                divP.style.paddingBottom = '0.1px';

                // txt.textContent = allMessages[a].time;

                const timeObj = new Date(allMessages[a].time);

                // alert(timeObj.getMonth());

                const hmm = timeObj.getDay();
                const bruh = timeObj.getMonth();

                let day;
                let month;

                if (hmm === 0) {
                    day = 'Sun';
                } else if (hmm === 1) {
                    day = 'Mon';
                } else if (hmm === 2) {
                    day = 'Tue';
                } else if (hmm === 3) {
                    day = 'Wed';
                } else if (hmm === 4) {
                    day = 'Thu';
                } else if (hmm === 5) {
                    day = 'Fri';
                } else if (hmm === 6) {
                    day = 'Sat';
                }


                if (bruh === 0) {
                    bruh = 'Jan';
                } else if (bruh === 1) {
                    month = 'Feb';
                } else if (bruh === 2) {
                    month = 'Mar';
                } else if (bruh === 3) {
                    month = 'Apr';
                } else if (bruh === 4) {
                    month = 'May';
                } else if (bruh === 5) {
                    month = 'Jun';
                } else if (bruh === 6) {
                    month = 'Jul';
                } else if (bruh === 7) {
                    month = 'Aug';
                } else if (bruh === 8) {
                    month = 'Sep';
                } else if (bruh === 9) {
                    month = 'Oct';
                } else if (bruh === 10) {
                    month = 'Nov';
                } else if (bruh === 11) {
                    month = 'Dec';
                }

                const fine = timeObj.getFullYear();
                const year = fine.toString().slice(2);


                txt.textContent = day + ', ' + timeObj.getDate() + ' ' + month + ' ' + year + ', ' + timeObj.getHours() + ':' + timeObj.getMinutes();


            }

            // sP.innerHTML = `<p><span style="color: red;">${allMessages[a].sentTo}: </span>${allMessages[a].msg}</p>`;

            msgDiv.appendChild(divP);
            divP.appendChild(sP);
            divP.parentElement.insertBefore(txt, divP);


            msgDiv.scrollTop = msgDiv.scrollHeight;

            a++;

        }



while (e > 0) {
    //look for seen

    if (allMessages[e].status === 'seen' && allMessages[e].sentTo === whichUsrs.toLowerCase()) {
        // alert(allMessages[e].msg);

        // alert(allMessages[e].status + e + ',' + allMessages[e].id);

        const erm = allMessages[e].id;

    const tst = document.getElementById(erm);

    const txt = document.createElement('div');

    txt.id = 'seen1';

    txt.textContent = 'seen';
    txt.style.backgroundColor = 'red';
    txt.style.color = 'white';
    txt.style.margin = '5px';
    // txt.style.width = 'auto';
    txt.style.display = 'flex';
    txt.style.justifyContent = 'center';
    txt.style.alignItems = 'center';
    txt.style.borderRadius = '20px';
    // txt.style.marginTop = 'px';
    // txt.paddingLeft = '10px';
    // txt.marginLeft = '10px';

    // tst.appendChild(txt);

    // originalDiv.parentNode.insertBefore(newDiv, originalDiv.nextSibling);
    tst.parentElement.insertBefore(txt, tst.nextSibling);

    // alert(tst.textContent);
        
    //    msgStatusTxt.textContent = 'seen';  

        msgDiv.scrollTop = msgDiv.scrollHeight;

        break;
    }

    // if found then break
    e--;
}




    })
    .catch((error) => console.error("Error:", error));




// ws to get messages (live)
socket.onmessage = (event) => {
    console.log(`message from server: ${event.data}`);
    const data = JSON.parse(event.data);
    const msg = data.msg;
    const msgStatus = data.msgStatus;

    // const checker = false;

    if (msgStatus) {
        // checker = true;
        // alert(msgStatus);

        // msgStatusTxt.textContent = 'seen';


        // document.getElementById(hmm);
        const hmm = document.getElementsByClassName('user1');

        const ok = hmm[hmm.length - 1];


        const seen1 = document.getElementById('seen1');
        seen1.style.display = 'none';

         const seen2 = document.getElementById('seen2');

    // if (seen2) {
        // seen2.style.display = 'none';
    // }

    // Remove any old seen2 if it exists
const oldSeen = document.getElementById('seen2');
if (oldSeen) oldSeen.remove();


    const txt = document.createElement('div');

    // seen2.style.display = 'none';

    txt.id = 'seen2';
    txt.style.display = 'block';
    txt.textContent = 'seen';
    txt.style.backgroundColor = 'red';
    txt.style.color = 'white';
    txt.style.margin = '5px';
    // txt.style.width = 'auto';
    txt.style.display = 'flex';
    txt.style.justifyContent = 'center';
    txt.style.alignItems = 'center';
    txt.style.borderRadius = '20px';

    ok.parentElement.insertBefore(txt, ok.nextSibling);

        msgDiv.scrollTop = msgDiv.scrollHeight;

        // alert(hmm[hmm.length - 1].textContent);

        // let i = hmm.length;

        // while (i > 0) {

        // }

        // alert(hmm);

        // alert(hmm[0].textContent + 'huh');
        
        // now add the seen to the last el

        // const yep = document.getElementById(hmm.length + 1);

        // alert(hmm.length);

        // alert(yep.textContent);

    }

    if (msg) {

        const sP = document.createElement('p');
        const divP = document.createElement('div');

        const txt = document.createElement('p');


        sP.innerHTML = `<p>${msg}</p>`

        // if (checker) {
        // sP.innerHTML = `<p>${msg}, seen</p>`
        // }

        sP.style.color = 'white';
        sP.style.width = 'fit-content'


        divP.style.backgroundColor = '#121212';
        divP.style.opacity = '0.85';
        divP.style.height = sP.style.height;
        divP.style.width = sP.style.width;
        divP.style.paddingLeft = '2px';
        divP.style.paddingRight = '4px';
        divP.style.borderRadius = '4px';
        divP.style.marginLeft = '4px';
        divP.style.marginTop = '6px';
        divP.style.paddingTop = '0.1px';
        divP.style.paddingBottom = '0.1px';



        const timeObj = new Date();

        // alert(timeObj.getMonth());
    
        const hmm = timeObj.getDay();
        const bruh = timeObj.getMonth();
    
        let day;
        let month;
    
        if (hmm === 0) {
            day = 'Sun';
        } else if (hmm === 1) {
            day = 'Mon';
        } else if (hmm === 2) {
            day = 'Tue';
        } else if (hmm === 3) {
            day = 'Wed';
        } else if (hmm === 4) {
            day = 'Thu';
        } else if (hmm === 5) {
            day = 'Fri';
        } else if (hmm === 6) {
            day = 'Sat';
        }
    
    
        if (bruh === 0) {
            bruh = 'Jan';
        } else if (bruh === 1) {
            month = 'Feb';
        } else if (bruh === 2) {
            month = 'Mar';
        } else if (bruh === 3) {
            month = 'Apr';
        } else if (bruh === 4) {
            month = 'May';
        } else if (bruh === 5) {
            month = 'Jun';
        } else if (bruh === 6) {
            month = 'Jul';
        } else if (bruh === 7) {
            month = 'Aug';
        } else if (bruh === 8) {
            month = 'Sep';
        } else if (bruh === 9) {
            month = 'Oct';
        } else if (bruh === 10) {
            month = 'Nov';
        } else if (bruh === 11) {
            month = 'Dec';
        }
    
        const fine = timeObj.getFullYear();
        const year = fine.toString().slice(2);
    
    
        txt.textContent = day + ', ' + timeObj.getDate() + ' ' + month + ' ' + year + ', ' + timeObj.getHours() + ':' + timeObj.getMinutes();
    
    
    
    
        divP.appendChild(sP);
        msgDiv.appendChild(divP);
        divP.parentElement.insertBefore(txt, divP);


        // const sP2 = document.createElement('p');
        // sP2.innerText = `${whichUsrs}: ${msg}`;

        // msgDiv.appendChild(sP2);

        msgDiv.scrollTop = msgDiv.scrollHeight;


    }

}           
