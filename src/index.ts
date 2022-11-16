import config from "./apiConfig";
import app from "./app";

const {port} = config;
app.listen(port, () => { //port peaks päris äpis olema environment variables alt võetud
    console.log('Server is running on port 3000');
})