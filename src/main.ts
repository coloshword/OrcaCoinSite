import axios from "axios";
import * as display from "./display";

/** getStatus: gets the status of Orcacoin (if bootstrap node HTTP server 130.245.173.208 is up) */
async function getStatus() {
    try {
        await axios.get('http://130.245.173.208:3333/hello', {
            timeout: 3000 
        });
        return true; 
    } catch (error) {
        console.log("Orcacoin is down");
        return false; 
    }
}


// getBlockchainInfo: gets the blockchain information of Orcacoin by making a /getBlockchainInfo request to the bootstrap node
async function getBlockchainInfo() {
    try {
        const response = await axios.get('http://130.245.173.208:3333/getBlockchainInfo', {
            timeout: 3000 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error getting blockchain info");
        return null;
    }
}

async function main() {
    const status = await getStatus();
    display.displayNetworkStatus(status);
    const bcObj = await getBlockchainInfo();
    console.log(JSON.stringify(bcObj));
}

main(); 
