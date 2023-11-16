import { Buffer } from "buffer";

export async function analyzeImageML(type, imageData) {
  const returnData = {
    type: "warning",
    text: "This feature has not been implemented yet!",
  };
  return JSON.stringify(returnData);
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
