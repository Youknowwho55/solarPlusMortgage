/** @format */

const { google } = require("googleapis");
const fs = require("fs");

// Load credentials from the JSON file you downloaded
const credentials = require("path/to/your/credentials.json");
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Set the token if you have it saved from a previous authorization
oAuth2Client.setCredentials(/* your saved token */);

// Google Drive API instance
const drive = google.drive({ version: "v3", auth: oAuth2Client });

// Example: Create a folder
async function createFolder(folderName) {
  const res = await drive.files.create({
    resource: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });
  console.log("Folder ID:", res.data.id);
}

// Example: Upload a file
async function uploadFile(filePath, folderId) {
  const fileMetadata = {
    name: "example.txt",
    parents: [folderId], // Optional: specify the folder to upload to
  };
  const media = {
    body: fs.createReadStream(filePath),
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });
  console.log("File ID:", res.data.id);
}

// Example: Download a file
async function downloadFile(fileId, destinationPath) {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  const dest = fs.createWriteStream(destinationPath);
  await new Promise((resolve, reject) => {
    res.data
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .pipe(dest);
  });
}

// Example Usage
async function main() {
  // Use these functions as needed
  await createFolder("MyFolder");
  await uploadFile("path/to/upload/file.txt", "folderId");
  await downloadFile("fileId", "path/to/download/file.txt");
}

main();
