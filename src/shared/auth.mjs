import { google } from "googleapis";
import { existsSync, readFileSync } from "fs";

export async function getAccessToken(credentials) {
  if (!existsSync(credentials)) {
     console.error(`❌ ${credentials} not found, please follow the instructions in README.md`);
     console.error("");
     process.exit(1);
  }

  const key = JSON.parse(readFileSync(credentials, "utf8"));
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/webmasters.readonly", "https://www.googleapis.com/auth/indexing"],
    null
  );

  const tokens = await jwtClient.authorize();
  return tokens.access_token;
}
