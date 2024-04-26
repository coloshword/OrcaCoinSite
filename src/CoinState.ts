// CoinState: class to store state of coin

import * as display from "./display";
type BlockchainInfo = {
    bestblockhash: string;
    bip9_softforks: any;  // ignore nested structures
    blocks: number;
    chain: string;
    difficulty: number;
    headers: number;
    mediantime: number;
    pruned: boolean;
};

export class CoinState {
    public isUp: boolean = false;
    public numBlocks: number = 0;
    public bestBlockHash: string = "";
    public difficulty: number = 0;
    public peersConnected: number = 0;
    public latestBlockTime: number = 0;
    public blockChainDetails: string = "";

    // update: updates the state of the coin givne the JSON response Object 
    public update(bcObj:BlockchainInfo, status:boolean, numPeers: number, latestTime: number) {
        this.isUp = status;
        this.numBlocks = bcObj.blocks;
        this.bestBlockHash = bcObj.bestblockhash;
        this.difficulty = bcObj.difficulty;
        this.peersConnected = numPeers;
        this.latestBlockTime = latestTime;
        this.blockChainDetails = JSON.stringify(bcObj, null, 2).replace(/,/g, ',\n');
        this.updateDisplay();
    }

    /** updateSummary: updates the view of the summary (first half) */
    public updateSummary() {
        const heightContainer = document.querySelector("#block-height");
        if (heightContainer) {
            const heightTitle = heightContainer.querySelector(".blockchain-summary-title");
            const heightField = heightContainer.querySelector(".blockchain-summary-value");
            heightTitle && (heightTitle.textContent = "Block Height");
            heightField && (heightField.textContent = this.numBlocks.toString());
        }
        const diffContainer = document.querySelector("#difficulty");
        if (diffContainer) {
            const diffTitle = diffContainer.querySelector(".blockchain-summary-title");
            const diffField = diffContainer.querySelector(".blockchain-summary-value");
            diffTitle && (diffTitle.textContent = "Difficulty");
            diffField && (diffField.textContent = this.difficulty.toString());
        }
        const hashContainer = document.querySelector("#best-block-hash");
        if (hashContainer) {
            const hashTitle = hashContainer.querySelector(".blockchain-summary-title");
            const hashField = hashContainer.querySelector(".blockchain-summary-value");
            hashTitle && (hashTitle.textContent = "Best Block Hash");
            hashField && (hashField.textContent = this.bestBlockHash);
        }
        const latestBlockTimeContainer = document.querySelector("#latest-block-time");
        if (latestBlockTimeContainer) {
            const latestBlockTimeTitle = latestBlockTimeContainer.querySelector(".blockchain-summary-title");
            const latestBlockTimeField = latestBlockTimeContainer.querySelector(".blockchain-summary-value");
            latestBlockTimeTitle && (latestBlockTimeTitle.textContent = "Latest Block Time");
            latestBlockTimeField && (latestBlockTimeField.textContent = new Date(this.latestBlockTime * 1000).toLocaleString());
        }
        const peersContainer = document.querySelector("#num-peers");
        if (peersContainer) {
            const peersTitle = peersContainer.querySelector(".blockchain-summary-title");
            const peersField = peersContainer.querySelector(".blockchain-summary-value");
            peersTitle && (peersTitle.textContent = "Active Peers");
            peersField && (peersField.textContent = this.peersConnected.toString());
        }
        const networkHashrateContainer = document.querySelector("#hash-rate");
        if(networkHashrateContainer) {
            const networkHashrateTitle = networkHashrateContainer.querySelector(".blockchain-summary-title");
            const networkHashrateField = networkHashrateContainer.querySelector(".blockchain-summary-value");
            networkHashrateTitle && (networkHashrateTitle.textContent = "Hash rate");
            // calculate the hash rate
            const hashRate = this.difficulty * Math.pow(2, 32) / 600;
            networkHashrateField && (networkHashrateField.textContent = String(hashRate) + " H/s");
        }
    }

    public updateDisplay() {
        display.displayNetworkStatus(this.isUp);
        display.displayBlockchainInfo(this.blockChainDetails);
        this.updateSummary();
    }

    public displayDown() {
        this.updateDisplay();
    }
}