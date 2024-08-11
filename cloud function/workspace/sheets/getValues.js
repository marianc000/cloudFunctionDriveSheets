// getValues.js
import { sheetsAPI } from '../service.js';
 
async function getValues(spreadsheetId, range) {

  const { data: { values } } = await sheetsAPI.spreadsheets.values.get({
    spreadsheetId,
    range,
    valueRenderOption: 'UNFORMATTED_VALUE'
  });
 
  return values;
}

export function getTitles(spreadsheetId) {
  return getValues(spreadsheetId, '1:1').then(vals => vals?.[0]);
}
 