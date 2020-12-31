import AWS from "aws-sdk";

const email = new AWS.SES();

export async function main(event, context) {
    let body, statusCode;

    const {
        toUser,
        subject,
        emailContent,
    } = JSON.parse(event.body);

    const params = {
        Destination:{
            ToAddresses: [
                "paulovfmarques1@gmail.com",
                toUser
            ],
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: emailContent
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            }
        },
        Source: "marquespaulov@gmail.com",
    };

    try{
        await email.sendEmail(params).promise();

        body = params;
        statusCode = 200;
    }catch(err){
        body = {error: err.message};
        statusCode = 500;
    }

    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };
};