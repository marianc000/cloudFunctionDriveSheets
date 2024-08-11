//sevice.js
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
});

export const driveAPI = google.drive({ version: 'v3', auth });
export const sheetsAPI = google.sheets({version: 'v4', auth});