import AWS from "aws-sdk";

const ddb = new AWS.DynamoDB.DocumentClient();

export async function main(event,context) {
    let body, statusCode;

    const params = {
        TableName: "minions-per-user",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.pathParameters.id,
        },
    };

    try{
        const result = await ddb.query(params).promise();

        body = result.Items;
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