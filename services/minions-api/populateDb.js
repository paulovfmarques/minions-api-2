import AWS from "aws-sdk";
import * as uuid from "uuid";

const ddb = new AWS.DynamoDB.DocumentClient();

// THIS FUNCTION WAS EXCLUSIVELY USED TO POPULATE THE DATABASE WITH EXAMPLES
// DO NOT DEPLOY IT AS IS, SINCE THIS IS NOT AN OPTIMAL SOLUTION

export async function main(event, context) {
    let body,statusCode;

    const params = {
        TableName: "minions",
        Item: {
            minionId: uuid.v1(),
            content: {
                title: "Minion Captain",
                description: "He, who passes justice and defend the weak...oops, sorry, wrong one. This is just a cosplay",
                price: "$29.90"
            },
            attachment: "assets/captain-minion.png",
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
        body,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };
};
