import config from "./apiConfig";
import app from "./app";

const {port} = config;
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
})