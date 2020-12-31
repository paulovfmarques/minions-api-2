import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function main(event, context) {
    let body, statusCode;

    const params = {
        Bucket: "bucket-minion-uploads",
        Key: event.pathParameters.id,
        Expires: 5,
    };

    try{
        const url = await s3.getSignedUrlPromise('getObject', params);
        body = url;
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
}