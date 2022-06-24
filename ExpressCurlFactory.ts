
import fs from 'fs';
import util from 'util';
import moment from 'moment'


/* curl --location --request GET 'http://127.0.0.1:3000/v1/api/client/review/lawyer' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJyb2xlSWQiOjEsImZ1bGxOYW1lIjoiTGF3eWVyIDAwMCIsImVtYWlsIjoibGF3eWVyMDAwQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzUzOTkwMDAwMCJ9LCJpYXQiOjE2NTUwMjYxMjh9.X9nVdOAvDkC5hnIpIn-M_yODtoDHGsIN1SQqeFHEsSk'
 */


export const _printCurl = function (req: string) {
    console.log(req)

};



export const _writeCurl = async function (req: string) {
   let writeFile = util.promisify(fs.writeFile);
   const fileName=`${moment().utc().format('YYYY-MM-DD')}`
   !fs.existsSync(`./logger/`) && fs.mkdirSync(`./logger/`, { recursive: true })
   await writeFile(`./logger/${fileName}`,req); 
};



