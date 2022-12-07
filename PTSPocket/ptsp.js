const express = require('express');
const app = express();
  
// Open a call to `app.get()` below:
app.get('/',(req, res, next)=>{
    
    const achievement = {
        Name: "5k Run",
        PrimaryGroup: 'Running',
        SecondaryGroup: 'Athletics',
        Description: "Ran 5k in a single session"
    };
    
    res.status(200).send(achievement);
  });

const PORT = 4001
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});