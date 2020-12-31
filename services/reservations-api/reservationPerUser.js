import AWS from "aws-sdk";
import * as uuid from "uuid";

const ddb = new AWS.DynamoDB.DocumentClient();

export async function main(event,context) {
    let body, statusCode;

    const { userId, minionId, content, attachment } = JSON.parse(event.body);

    const params = {
        TableName: "minions-per-user",
        Item: {
            userId,
            registrationId: uuid.v1(),
            minionId,
            content,
            attachment,
            createdAt: Date.now(),
        },
    };

    try{
        await ddb.put(params).promise();

        body = params.Item;
        statusCode = 200;
    }catch(err){
        statusCode = 500;
        body = { error: err.message };
    }

    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };
}