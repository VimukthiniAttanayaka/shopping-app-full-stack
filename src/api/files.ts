import {DateTime} from 'luxon'

const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

interface File {
    name: string;
    // Define other properties of the file if necessary
}

const generateFileName = (fileName:string) => {
    const timeNow = DateTime.now().toMillis();
    return timeNow+fileName
}

const s3 = new S3Client({
    credentials: {
        accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    },
    region: import.meta.env.VITE_BUCKET_REGION,
});

export const uploadFile = async (file: File): Promise<{httpStatusCode: number, data: string}> => {
    const modifiedFileName = generateFileName(file.name)
    const params = {
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: modifiedFileName,
        Body: file,
    }
    const command = new PutObjectCommand(params);
    try {
        await s3.send(command);
        return {httpStatusCode: 200, data: modifiedFileName};
    } catch (err) {
        return {httpStatusCode: 400, data: 'failed'};
    }
};
