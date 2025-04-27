require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 7272;

// NEED TO SEPARATE THE FUNCTIONS
// VIA EXPORT & IMPORT

const expressWs = require('express-ws');
expressWs(app);

app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

let emailSend;

//otp gen
function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

 let otp;


//Move otp endpoint out IF got time bruh
//it is wrong

app.post('/mail', (req, res) => {
  emailSend = req.body.emailSend;
  console.log(emailSend);
  res.status(200).send('Request received');

  otp = generateSixDigitNumber();

  console.log(otp);

  app.post('/otp', (req,res) => {
      codeInput = req.body.codeInput;
      if (codeInput == otp) {
          res.send('valid')
      } else {
          res.send('invalid');
      }
  })

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 587,
      secure: false, // true for 465
      auth: {
          user: 'owner@filmvibe.site',
          pass: process.env.EMAILPASSWORD,
      },
  });

  // Set up the email options
  const mailOptions = {
      from: 'owner <owner@filmvibe.site>',
      to: `${emailSend}`,
      subject: 'Hello',
      text: `Hello there, your OTP is ${otp}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log(`Email sent to ${emailSend}` + info.response);
  });
});


const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'dark',
    password: process.env.DB2PASSWORD,
    database: 'main',
    waitForConnections: true,
    connectionLimit: 5,  //hm
    queueLimit: 0
  });


// // ok
// const pool = mysql.createPool({
//   host: 'iihpu.h.filess.io',
//   port: 3307,
//   user: 'test673_excitement',
//   password: process.env.DB1PASSWORD,
//   database: 'test673_excitement',
//   waitForConnections: true,
//   connectionLimit: 5,  //hm
//   queueLimit: 0
// });

/*const pool1 = mysql.createPool({
  host: 'localhost',
  user: 'dark',
  password: process.env.DB2PASSWORD,
  database: 'main',
  waitForConnections: true,
  connectionLimit: 10,  //hm
  queueLimit: 0
});*/

// // Create a connection pool
// const pool2 = mysql.createPool({
//   host: 'localhost',
//   user: 'dark',
//   password: process.env.DB2PASSWORD,
//   database: 'main',
//   waitForConnections: true,
//   connectionLimit: 10,  //hm
//   queueLimit: 0
// });

// Function to query the database using the pool
function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}



// // Function to query the database using the pool
// function queryDatabase2(query, params) {
//   return new Promise((resolve, reject) => {
//     pool2.query(query, params, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }


// Add User (Sign Up)
async function add(req, res) {
  const usr0 = req.body.usr;
  const usr = usr0.toLowerCase();
  const email = req.body.email;
  const passwd = req.body.passwd;

  try {
    const Query1 = `SELECT username FROM users WHERE email = ?;`;
    const emailExists = await queryDatabase(Query1, [email]);

    if (emailExists.length > 0) {
      return res.send("nice try diddy");
    }

    const Query2 = `SELECT email FROM users WHERE username = ?;`;
    const usernameExists = await queryDatabase(Query2, [usr]);

    if (usernameExists.length > 0) {
      return res.send("nice try diddy");
    }

    // Insert new user
    const Query3 = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
    const result = await queryDatabase(Query3, [usr, email, passwd]);

    console.log("Data inserted successfully:", result);
    res.send("ok");

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
}


// Validator (Sign In)
async function validator (req, res) {

  const email = req.body.email;
  const passwd = req.body.passwd;

  let checker = false;

  const ifUsr = email.split("");

  if (ifUsr.includes("@")) {
    checker = true;
  }

  if (checker) {

  try {
  const Query = `SELECT password FROM users WHERE email = ?;`;

  const results = await queryDatabase(Query, [email])

      if (results == 0) {
          res.send('emailNotExist');
          return;

      } else {

      const result = results[0].password; // object is inside array

      if (result == passwd) {
          res.send('success');

      } else if (result !== passwd) {
          res.send('invalidPsswd');
      }
    }
  }
  catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }

} else {

  try {
    const Query = `SELECT password FROM users WHERE username = ?;`;
  
    const results = await queryDatabase(Query, [email])
  
        if (results == 0) {
            res.send('emailNotExist');
            return;
  
        } else {
  
        const result = results[0].password; // object is inside array
  
        if (result == passwd) {
            res.send('success');
  
        } else if (result !== passwd) {
            res.send('invalidPsswd');
        }
      }
    }
    catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    }

}

}


// checker (sign up)
async function checker (req, res) {

  const email = req.body.email;
  const usr0 = req.body.usr;
  const usr = usr0.toLowerCase();

  try {
  const queryEmail = `SELECT email FROM users WHERE email = ?;`;

  const results1 = await queryDatabase(queryEmail, [email])

    if (results1.length > 0) {
      return res.send('emailAlreadyExist');
    }

    //second thing
    const queryUsername = `SELECT username FROM users WHERE username = ?;`;

    const results2 = await queryDatabase(queryUsername, [usr])

      if (results2.length > 0) {
        return res.send('usrAlreadyExist');
      }

      // If both email and username are unique
      return res.send('ok');
    }
     catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
      }
}


// Data Retreiver
async function dataRetreiver (req, res) {
  
  const email = req.body.email;
  let bugFix = email;

  let checker = false;

  const ifUsr = email.split("");

  if (ifUsr.includes("@")) {
    checker = true;
  }

  if (checker) {

  try {
  const Query = `SELECT username, theme, usrs FROM users WHERE email = ?;`;

  const results = await queryDatabase(Query, [email])

      console.log(results);

      const username = results[0].username; // object is inside array
      const theme = results[0].theme;
      const usrsBhenchod = results[0].usrs;

      if (usrsBhenchod) {
      const usrsBetichod = usrsBhenchod.split(",");

      res.json({
        usr: username,
        theme: theme,
        usrs420: usrsBetichod
       })

      } else if (!usrsBhenchod) {
        res.json({
          usr: username,
          theme: theme,
          usrs420: null
         })
      }
    }
     catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    }

  } else {


  try {
    const Query = `SELECT email, theme, usrs FROM users WHERE username = ?;`;
  
    const results = await queryDatabase(Query, [bugFix])
  
        console.log(results);
  
        const email = results[0].email; // object is inside array
        const theme = results[0].theme;
        const usrsBhenchod = results[0].usrs;
  
        if (usrsBhenchod) {
        const usrsBetichod = usrsBhenchod.split(",");
  
        res.json({
          email: email,
          theme: theme,
          usrs420: usrsBetichod
         })
  
        } else if (!usrsBhenchod) {
          res.json({
            email: email,
            theme: theme,
            usrs420: null
           })
        }
      }
       catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
      }
  

  }

}


// Data Receiver
async function dataReceiver (req, res) {

  const usr = req.body.usr;
  const theme = req.body.theme;
  const usrs = req.body.usrs;

  console.log(`usr: ${usr}, theme: ${theme}, usrs: ${usrs}`);

  try {

  const Query0 = `UPDATE users SET theme = ? WHERE username = ?;`;
  
if (theme) {
  await queryDatabase(Query0, [theme, usr])
}

if (usrs) {

const Query1 = `
  UPDATE users
  SET reqPendingTo = IF(reqPendingTo IS NULL OR reqPendingTo = "", ?, CONCAT(reqPendingTo, ?))
  WHERE username = ?;
`;

await queryDatabase(Query1, [`,${usrs}`, `,${usrs}`, usr])

const Query2 = `
  UPDATE users
  SET reqPendingFrom = IF(reqPendingFrom IS NULL OR reqPendingTo = "", ?, CONCAT(reqPendingFrom, ?))
  WHERE username = ?;
`;

await queryDatabase(Query2, [`,${usr}`, `,${usr}`, usrs])

}
    res.send('done');
    console.log('done');
}
 catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
}

// Friend Requests Handler (Display)
async function chut (req, res) {

  const usr = req.body.usr;
  const mode = req.body.mode;

try {
  const Query = 'SELECT reqPendingFrom FROM users WHERE username = ?';

  if (usr && mode == 'pf') {

      const results = await queryDatabase(Query, [usr])

      if (results.length > 0 && results[0].reqPendingFrom) {

        const reqPendingFrom = results[0].reqPendingFrom;
        const reqPF = reqPendingFrom.split(",");

        res.json({
          reqPF: reqPF
        });

      } else {

        res.json({ no: 'no' });
        console.log('no');
      }


  } else if (usr && mode == 'pt') {
    const Query2 = 'SELECT reqPendingTo FROM users WHERE username = ?';

    const results = await queryDatabase(Query2, [usr])

      if (results.length > 0 && results[0].reqPendingTo) {

        const reqPendingTo = results[0].reqPendingTo;
        const reqPT = reqPendingTo.split(",");

        res.json({
          reqPT: reqPT
        });

      } else {

        res.json({
          no: 'no'
        });
        console.log('no');
      }
  }
}
 catch (err) {
   console.error("Error:", err);
   res.status(500).send("Internal server error");
 }
}


async function chutHandler (req, res) {

  const usr = req.body.usr;
  const usrs = req.body.usrs;
  const ans = req.body.ans;


  if (usrs && ans == 'yes') {

    const Query = `
    UPDATE users
    SET reqPendingTo = REPLACE(reqPendingTo, ?, '')
    WHERE username = ?;
  `;

  const results = await queryDatabase(Query, [`,${usr}`, usrs])
  console.log('Data updated successfully:', results);


  const Query69 = `
    UPDATE users
    SET reqPendingFrom = REPLACE(reqPendingFrom, ?, '')
    WHERE username = ?
  `;

  const results69 = await queryDatabase(Query69, [`,${usrs}`, usr]);
  console.log('Data updated successfully:', results69);


  const Query2 = `
    UPDATE users
    SET usrs = IF(usrs IS NULL OR usrs = "", ?, CONCAT(usrs, ?))
    WHERE username = ?;
  `;

  const results2 = await queryDatabase(Query2, [`,${usrs}`, `,${usrs}`, usr])
  console.log('Data updated successfully:', results2);


  const Query3 = `
    UPDATE users
    SET usrs = IF(usrs IS NULL OR usrs = "", ?, CONCAT(usrs, ?))
    WHERE username = ?;
  `;

  const results3 = await queryDatabase(Query3, [`,${usr}`, `,${usr}`, usrs])
  console.log('Data updated successfully:', results3);


} else if (usrs && ans == 'no') {


  const Query = `
  UPDATE users
  SET reqPendingTo = REPLACE(reqPendingTo, ?, '')
  WHERE username = ?;
`;

  const results = await queryDatabase(Query, [`,${usr}`, usrs])
  console.log('Data updated successfully:', results);


const Query69 = `
  UPDATE users
  SET reqPendingFrom = REPLACE(reqPendingFrom, ?, '')
  WHERE username = ?
`;

const results69 = await queryDatabase(Query69, [`,${usrs}`, usr])
console.log('Data updated successfully:', results69);

}
}


//Messages Retreiver
async function msgRetreiver(req, res) {
  

  const usr = req.body.usr;
  const usrs = req.body.usrs;


  try {

  if (!usr || !usrs) {
    res.status(400).send('Invalid request');
    return;
}

  if (usr && usrs) {

    const Query = `
    SELECT msg, time, sentTo, status, id FROM msgs WHERE sentFrom = ? AND sentTo = ?;
    `;

    let allMessagesReceived;

    let noMsg1;
    let noMsg2;

    const results = await queryDatabase(Query, [usrs, usr])


          allMessagesReceived = results;

      
    const results2 =  await queryDatabase(Query, [usr, usrs])

      // if (results2 == 0) {

      //   noMsg2 = true;
      //   return;

      // } else {

      //   if (noMsg1 || noMsg2) {
      //     res.json({noMsg: noMsg1});
      //   }

        const allMessagesSent = results2;

        if (allMessagesReceived) {
          //starts here

          // Merge both arrays
          const allMessages = [...allMessagesReceived, ...allMessagesSent];

          // Sort messages by time
          allMessages.sort((a, b) => new Date(a.time) - new Date(b.time));

          res.json({
            allMessages: allMessages
          })

        }
    // }
}

}
 catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
 }

}


//Sign Up handler
app.post("/add", add);

//Sign In handler
app.post('/validator', validator);

//Sign Up Checker
app.post('/checker', checker);

//data sender // static
app.post('/dataRetreiver', dataRetreiver);

// data receiver
app.post('/dataReceiver', dataReceiver)

//Friend Requests Handler (Display)
app.post('/chut', chut);

//Friend Requests Handler (Main)
app.post('/chutHandler', chutHandler)

//Messages Retreiver
app.post('/msgRetreiver', msgRetreiver);





//jshshhs
async function wsMsg(ws, req) {
  console.log('A new client connected');

  // Listen for messages from the client
  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);

    try {
      const data = JSON.parse(message);
      const usr = data.usr;
      const usrs = data.usrs;
      const msg = data.msg;
      const sendUsrs = data.sendUsrs;

      if (usr) {
        usr.toLowerCase();
      }

      if (usrs) {
        usrs.toLowerCase();
      }

      if (sendUsrs) {
        sendUsrs.toLowerCase();
      }

      // Store the socket with the username as a key
      if (usr) {
        clients2[usr.toLowerCase()] = ws;
        console.log(`Client ${usr} connected to wsMsg.`);
      }

      // hdhhdhdhdh

      if (usr && usrs) {

        //now look for the messages from the other person
        //which says 'unseen' and mark all of them as 'seen'.


        // websocket executes everytime when it gets hit
        // the socket is connect constantly but the 
        // requests are only made when it gets triggered.

        const query = `
        UPDATE msgs
        SET status = 'seen'
        WHERE sentTo = ? AND sentFrom = ? AND status = 'unseen'
        ;`;

        const results = await queryDatabase(query, [usr, usrs]);

        // now send the request to the client that you have seen the msg of.
        // in real time but this executes only when you open the chatBox
        // the reason i cant use fetch here is because OF REAL TIME
        // end

        sendJsonMessageToClient69(usrs.toLowerCase(), {msgStatus: 'seen'});

      }
    


      if (usr && sendUsrs && msg) {
        //msgHandler

        const insertQuery = `
        INSERT INTO msgs (sentTo, sentFrom, msg)
        VALUES 
          (?, ?, ?);
      `;

        const results69 = await queryDatabase(insertQuery, [sendUsrs.toLowerCase(), usr, msg])

    console.log('Data inserted successfully:', results69);

    //systum
        sendJsonMessageToClient2(sendUsrs.toLowerCase(), usr, {msg: msg});


    }

  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});

// Handle client disconnection
ws.on('close', () => {
  // Find the username of the disconnected client and remove it from the clients map
  for (let username in clients2) {
    if (clients2[username] === ws) {
      delete clients2[username];
      console.log(`${username} disconnected from wsMsg.`);
      break;
    }
  }
});

}


app.ws('/wsMsg', wsMsg);



//bshejdjrhhdjejej

async function webskt (ws, req) {

  console.log('A new client connected');

  // Listen for messages from the client
  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);

    try {
      const data = JSON.parse(message);
      const usr = data.usr;
      const usrs = data.usrs;

      // const msg = data.msg;
      // const sendUsrs = data.sendUsrs;

if (usr) {
usr.toLowerCase();
}

if (usrs) {
usrs.toLowerCase();
}

// if (sendUsrs) {
// sendUsrs.toLowerCase();
// }

      // const staticUsrs = data.staticUsrs;

        // Store the socket with the username as a key
if (usr) {
        clients[usr.toLowerCase()] = ws;
        console.log(`Client ${usr} connected.`);
}

        // Send a response as JSON
        const response = { message: `Hello, ${usr}! You are now connected.` };
        ws.send(JSON.stringify(response)); // Send the response as a JSON string
        

      if (usr && usrs) {

        let checker = false;

        if (usr && usrs) {
          const query69 = `SELECT EXISTS (
            SELECT 1 FROM users
            WHERE username LIKE ?
          ) AS exists_check`; 
        
          const results69 = await queryDatabase(query69, [`%${usrs}%`]);
        
          if (results69[0].exists_check === 0) {
            return ws.send('notExists');
          } else {

            checker = true;

            ws.send('exists');
          }
        }
        

        if (checker) {
        
        const Query = `
            UPDATE users
            SET reqPendingTo = IF(reqPendingTo IS NULL OR reqPendingTo = "", ?, CONCAT(reqPendingTo, ?))
            WHERE username = ?;
          `;

          const results = await queryDatabase(Query, [`,${usrs}`, `,${usrs}`, usr])          
          console.log('Data updated successfully:', results);

          
          const Query2 = `
            UPDATE users
            SET reqPendingFrom = IF(reqPendingFrom IS NULL OR reqPendingFrom = "", ?, CONCAT(reqPendingFrom, ?))
            WHERE username = ?;
          `;

          const results2 = await queryDatabase(Query2, [`,${usr}`, `,${usr}`, usrs])
          console.log('Data updated successfully:', results2);




          // ws.send(JSON.stringify({
          //   ok: 'ok'
          // }))

          ws.send('ws: done');

          
          // I think this is the one that sends to the req to other user via ws (code modifying 25 apr, 2025)
          sendJsonMessageToClient(usrs, {reqPF: usr});

      }
        }


      //   if (usr && sendUsrs && msg) {
      //     //msgHandler

      //     const insertQuery = `
      //     INSERT INTO msgs (sentTo, sentFrom, msg)
      //     VALUES 
      //       (?, ?, ?);
      //   `;

      //     const results69 = await queryDatabase(insertQuery, [sendUsrs, usr, msg])
  
      // console.log('Data inserted successfully:', results69);

      // //systum
      //     sendJsonMessageToClient(sendUsrs.toLowerCase(), {msg: msg});


      // }

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Find the username of the disconnected client and remove it from the clients map
    for (let username in clients) {
      if (clients[username] === ws) {
        delete clients[username];
        console.log(`${username} disconnected.`);
        break;
      }
    }
  });


}


// Object to map usernames to WebSocket connections
const clients = {};

app.ws('/ws', webskt);

const clients2 = {};

// Function to send a JSON message to a specific client by their username
async function sendJsonMessageToClient2(username, usr, jsonMessage) {
  const clientSocket = clients2[username.toLowerCase()];
  if (clientSocket) {

    const message = JSON.stringify(jsonMessage);

    clientSocket.send(message);

    console.log(`Message sent to client ${username}: ${message} , boom`);

    const query = `
    UPDATE msgs
    SET status = 'seen'
    WHERE sentTo = ? AND sentFrom = ? AND status = 'unseen'
    ;`;

    // this updates the seen shit from the person who has sent the message
    // that is user 1
    const results = await queryDatabase(query, [username, usr]);


    const msgStatus = {msgStatus: 'seen'};

    const userOneSocket = clients2[usr.toLowerCase()];

    userOneSocket.send(JSON.stringify(msgStatus));

    // console.log(usr + ", " + username);

    console.log(results);


  } else {
    console.log(`Client with username ${username} not found.`);
  }
}



// Function to send a JSON message to a specific client by their username
function sendJsonMessageToClient69(username, jsonMessage) {
  const clientSocket = clients2[username.toLowerCase()];
  if (clientSocket) {
    const message = JSON.stringify(jsonMessage);
    clientSocket.send(message);
    console.log(`Message sent to client ${username}: ${message}, 69`);
  } else {
    console.log(`Client with username ${username} not found, 69`);
  }
}


// Function to send a JSON message to a specific client by their username
function sendJsonMessageToClient(username, jsonMessage) {
  const clientSocket = clients[username.toLowerCase()];
  if (clientSocket) {
    const message = JSON.stringify(jsonMessage);
    clientSocket.send(message);
    console.log(`Message sent to client ${username}: ${message}`);
  } else {
    console.log(`Client with username ${username} not found.`);
  }
}

// sendJsonMessageToClient('usrAny', { message: 'Hello' });


app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
})
