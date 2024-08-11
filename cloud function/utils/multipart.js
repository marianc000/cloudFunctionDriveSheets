import Busboy from 'busboy';
import { buffer } from 'stream/consumers';

export function getParts(req) {

    const busboy = Busboy({ headers: req.headers });

    const fields = {};
    const files = [];

    busboy.on('field', (fieldName, val) => fields[fieldName] = val);
    busboy.on('file', (fieldName, file, { filename }) => {

        if (filename) {
            files.push({ fieldName, filename, buf: buffer(file) });
        } else {
            file.resume();
        }
    });

    return new Promise(resolve => {
        busboy.on('finish', () =>
            Promise.all(files.map(o => o.buf))
                .then(ar => {
                    files.forEach((o, i) => o.buf = ar[i]);
                    resolve({ fields, files });
                }))
 
        busboy.end(req.rawBody);
    });
} 