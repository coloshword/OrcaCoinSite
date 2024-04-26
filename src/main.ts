import axios from "axios";
import * as display from "./display";
import { CoinState } from "./CoinState";

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

// get Peer info
async function getPeerInfo() {
    try {
        const response = await axios.get('http://130.245.173.208:3333/getPeerInfo', {
            timeout: 3000 
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log("Error getting peer info");
        return null;
    }
}

// getBestBlockInfo
async function getBestBlockInfo() {
    try {
        const response = await axios.get('http://130.245.173.208:3333/getBestBlockInfo', {
            timeout: 3000 
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log("Error getting best block info");
        return null;
    }
}


async function main() {
    const status = await getStatus();
    const bcObj = await getBlockchainInfo();
    const peerInfo = await getPeerInfo();
    const bestBlockInfo : any  = await getBestBlockInfo();
    var coinState = new CoinState();
    if (status) {
        coinState.update(bcObj, status, peerInfo.length, bestBlockInfo.time);  
    } else {
        coinState.displayDown();
    }
}

main(); 
