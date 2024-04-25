import axios from "axios";
console.log("check")
/** getStatus: gets the status of Orcacoin (if bootstrap node HTTP server 130.245.173.208 is up) */
function getStatus() {
    axios.get('http://130.245.173.208:3333/hello', {
        timeout: 3000 
    })
    .then(() => {
        // response doesn't matter we know server is up 
        console.log("Orcacoin is up");
    })
    .catch((error: Error) => {
        console.log("Orcacoin is down");
    }); 
}

function main() {
    getStatus();
}

main(); 
