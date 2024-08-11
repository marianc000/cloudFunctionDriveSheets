// appendValues.js
import { sheetsAPI } from '../service.js';
import { getTitles } from './getValues.js';
import { msToNum } from './dates.js';
async function appendValues(spreadsheetId, values) {

  const { data } = await sheetsAPI.spreadsheets.values.append({
    spreadsheetId,
    range: 'A:Z',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values
    }
  });

  return data;
}


function makeRow(data, titles) {
  data = Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      if (k.endsWith('UTC')) {
        return [k.replace(/UTC$/, '').toLowerCase(), msToNum(v)];
      }
      return [k.toLowerCase(), v];
    }));

  return titles.map(k => data[k.toLowerCase()]);
}

export async function appendRows(spreadsheetId, sheetsData) {
  const titles = await getTitles(spreadsheetId);

  const rows = sheetsData.map(o => makeRow(o, titles));

  return appendValues(spreadsheetId, rows);
}