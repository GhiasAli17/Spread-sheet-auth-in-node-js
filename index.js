const express = require('express');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const app = express()

app.get('/',async (req,res)=>{
    console.log('gglo',google);
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
   
      // Create client instance for auth
      const client = await auth.getClient();
   
      // Instance of Google Sheets API
      const googleSheets = google.sheets({ version: "v4", auth: client });
   
      const spreadsheetId = "199MfsWshW5zGbpapi7_4yWX9oTzXOQ7KL7R-fqZTiUg";
   
      // Get metadata about spreadsheet
      const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
      });

      //reading data from

      const getRows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId,
          range: "Sheet1A:A"
      })

      console.log('row ', getRows);

      // writing to
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "RAW",
        resource: {
          values: [["make a tut", "test"]],
        },
      });

      res.send(metaData.data)

})

app.listen(3001,(req,res)=>{
      console.log('app is listening at 3001')
})
