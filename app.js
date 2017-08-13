const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")

const app = express()

                 
var app_token_primary = "EAAbmMVJVEkYBAM5NE8QSuihqn7IGfCNsqc1UQJJAoHxoAD7RCst3UAUNMcZCzTWcX4GVMZB7zvaIPCHKgQUsk5ZCqp07L0ekRt22CwY4G2NquLwergX7HNrjiCoDxUMjz67XUPbZCzsbYBJATIOsumnm8sxGACGSWgioavZBKdgZDZD"
var app_token_secondary1 = "EAAbfPpdUY1IBALZBrENmWs6hAhZC3uR84pcAcde1KxbHI95gB0HsJJVc9HUGJPpqaqjdnkmq0fK6dPxT1gTl51e6X11XlZBcxme6jjPsgLBMfKNBtZADIAcmVVZAtQfQdvCtBJqRzWZAuXWf3CFWgB6IVduiBwI94a6rcTxmybogZDZD"
var app_token_secondary2 = "EAAB5U5CFxD8BALqS9B4HVD3Ufnfd6FA076lIedFjIA0e4nwYzZCki7vVXAQSKYSOIG4LKu1qSoxTLDFu7bnwIBOuGrHjayfLFXUgnebZAsEMfIeLNgia7fUw4haEkZAPZB9og5b2B2iz7j2ZC7NS19YBMjY99luVaIPZAlwe1IpgZDZD"
app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("Hi, I am a chatbot 149")
})
// ================== primary start =========================
app.get('/primary', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === '111') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});
app.post('/primary', function (req, res) {
    console.log("Pri")
    var data = req.body;
    
    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            
            entry.messaging.forEach(function (event) {
                if (event.message) {
                    receivedMessage(event);
                }
                else if (event.postback) {
                    receivedPostback(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.sendStatus(200);
    }
});
// ================== primary end =========================
// ================== secondary 1 start ======================
app.get('/secondary1', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === '222') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});
app.post('/secondary1', function (req, res) {
    console.log("Sec1")
    var data = req.body;
    
    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            
            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {
                if (event.message) {
                    receivedMessage1(event);
                }
                else if (event.postback) {
                    receivedPostback(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.sendStatus(200);
    }
});
// ================== secondary 1 end ======================
//=================== secondary 2 start ===========================
app.get('/secondary2', function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === '333') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});
app.post('/secondary2', function (req, res) {
    console.log("Sec2")
    var data = req.body;
    
    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;
            
            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {
                
                if (event.message) {
                    receivedMessage2(event);
                }
                else if (event.postback) {
                    receivedPostback(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.sendStatus(200);
    }
});
// ================== secondary 2 end ======================
//=================== receivedMessage Pri start ==============================
function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    //  console.log(JSON.stringify(message));

    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
            case 'go1':
                passSec(senderID);
                break;
            case 'go2':
                passSec2(senderID);
                break;
            case 'สวัสดี':
                sendTextMessage(senderID, "สวัสดีเราคือ Primary");
                break;
            default:
                sendTextMessage(senderID, messageText);
                break;
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "ส่งห่าไรมากูอ่านไม่ออก");
    }
}
//=================== receivedMessage Pri end ==============================
// ================== receivedMessage Sec1 start ================
function receivedMessage1(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    //  console.log(JSON.stringify(message));

    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
            case 'bot':
                passPri(senderID);
                break;
            case 'go2':
                passSec1_to_Sec2(senderID);
                break;
            case 'สวัสดี':
                sendTextMessage(senderID, "สวัสดีเราคือ Secondary 1");
                break;
        }
    } 
}
//=================== receivedMessage Sec1 end ===================
// ================== receivedMessage Sec2 start ================
function receivedMessage2(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    //  console.log(JSON.stringify(message));

    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
            case 'bot':
                passPri3(senderID);
                break;
            case 'go1':
                passSec2_to_Sec1(senderID);
                break;
            case 'สวัสดี':
                sendTextMessage(senderID, "สวัสดีเราคือ Secondary 2");
                break;
        }
        
    } 
}
//=================== receivedMessage Sec2 end ===================
//=================== Primary Start sec1 to pri  ===============================
function passPri(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 1941949369356870,
        metadata:"free formed text for another app"
    };
    passSendAPIPri(messageData);
}
function passSendAPIPri(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_secondary1 },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
//=================== Primary End sec1 to pri =================================
//=================== Primary Start sec2 to pri ===============================
function passPri3(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 1941949369356870,
        metadata:"free formed text for another app"
    };
    passSendAPIPri3(messageData);
}
function passSendAPIPri3(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_secondary2 },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
//=================== Primary End sec2 to pri =================================
//=================== Secondary 1 start  pri to sec1 ================
function passSec(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 1934309780120402,
        metadata:"free formed text for another app"
    };

    passSendAPI(messageData);
}
function passSendAPI(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_primary },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
// ================== Secondary 1 end   pri to sec1  ========================
//=================== Secondary 1 start sec2 to sec1 ================
function passSec2_to_Sec1(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 1934309780120402,
        metadata:"free formed text for another app"
    };

    passSendAPI_passSec2_to_Sec1(messageData);
}
function passSendAPI_passSec2_to_Sec1(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_secondary2 },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
// ================== Secondary 1 end sec2 to sec1 ========================
//=================== Secondary 2 start pri to sec2 ================
function passSec2(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 133399813932095,
        metadata:"free formed text for another app"
    };

    passSendAPI2(messageData);
}
function passSendAPI2(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_primary },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
// ================== Secondary 2 end pri to sec2 ========================
//=================== Secondary 2 start sec1 to sec2 ================
function passSec1_to_Sec2(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        target_app_id: 133399813932095,
        metadata:"free formed text for another app"
    };

    passSendAPI_sec1_to_sec2(messageData);
}
function passSendAPI_sec1_to_sec2(messageData) {

    request({
        uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
        qs: { access_token: app_token_secondary1 },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });   
}
// ================== Secondary 2 end sec1 to sec2 ========================
//=================== Other Start =====================
function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        },
    };

    callSendAPI(messageData);
}
function callSendAPI(messageData) {
    
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: app_token_primary },   //app_token_secondary1
        method: 'POST',
        json: messageData

     }),
    request({
        uri: 'https://graph.facebook.com/v2.6/me/take_thread_control',
        qs: { access_token: app_token_primary },   //app_token_secondary1
        method: 'POST',
        json: messageData

     }),
     function (error, response, body) {
         console.log("HHH");
         if (!error && response.statusCode == 200) {
             var recipientId = body.recipient_id;
             var messageId = body.message_id;

             console.log("Successfully sent generic message with id %s to recipient %s",
                 messageId, recipientId);
          } else {
             console.error("Unable to send message.");
             console.error(response);
             console.error(error);
        }
     }
}
function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' " +
        "at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    sendTextMessage(senderID, "Postback called");
}
app.listen(app.get('port'), function () {
    console.log("running: port")
})
//================== Other end =====================