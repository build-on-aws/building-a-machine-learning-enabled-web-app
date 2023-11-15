import { Buffer } from "buffer";
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import { DetectDocumentTextCommand, TextractClient } from "@aws-sdk/client-textract";

let rekognitionClient = null;
let textractClient = null;

// Check README.md for instructions on configuring the required local file
const creds = {
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
};

export async function analyzeImageML(type, imageData) {
  // Encode the image bytes as uint8
  const uimage_bytes = base64ToUint8Array(
    imageData.split("data:application/octet-stream;base64,")[1]
  );
  let response = null;
  try {
    if (type == "labels") {
      if (!rekognitionClient) rekognitionClient = new RekognitionClient(creds);
      const params = {
        Image: { Bytes: uimage_bytes },
        MaxLabels: 10,
        MinConfidence: 80,
      };
      const query = new DetectLabelsCommand(params);
      response = await rekognitionClient.send(query);
    } else if (type == "text") {
      if (!textractClient) textractClient = new TextractClient(creds);
      const params = {
        Document: { Bytes: uimage_bytes },
      };
      const query = new DetectDocumentTextCommand(params);
      response = await textractClient.send(query);
    }
  } catch (error) {
    const errorData = {
      type: "error" /* success info warning error */,
      text: error.message,
    };
    return JSON.stringify(errorData);
  } finally {
    const returnData = {
      type: "success",
      text: response,
    };
    return JSON.stringify(returnData);
  }
}

// imageData is string with data:application/octet-stream;base64,...
function base64ToUint8Array(base64Data) {
  const decoded = Buffer.from(base64Data, "base64");
  const bytes = new Uint8Array(
    decoded.buffer,
    decoded.byteOffset,
    decoded.byteLength
  );
  return bytes;
}
