import * as display from "./display";

type BlockchainInfo = {
    bestblockhash: string;
    bip9_softforks: any;
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

    public update(bcObj: BlockchainInfo, status: boolean, numPeers: number, latestTime: number) {
        this.isUp = status;
        if (status) {
            this.numBlocks = bcObj.blocks;
            this.bestBlockHash = bcObj.bestblockhash;
            this.difficulty = bcObj.difficulty;
            this.peersConnected = numPeers;
            this.latestBlockTime = latestTime;
            this.blockChainDetails = JSON.stringify(bcObj, null, 2).replace(/,/g, ',\n');
        } else {
            this.numBlocks = NaN;
            this.bestBlockHash = "N/A";
            this.difficulty = NaN;
            this.peersConnected = NaN;
            this.latestBlockTime = NaN;
            this.blockChainDetails = "N/A";
        }
        this.updateDisplay();
    }

    public updateSummary() {
        const setFieldText = (selectorId: string, titleText: string, valueText: string | number, isUp: boolean) => {
            const container = document.querySelector(selectorId);
            if (container) {
                const title = container.querySelector(".blockchain-summary-title");
                const value = container.querySelector(".blockchain-summary-value");
                title && (title.textContent = titleText);
                value && (value.textContent = isUp ? ((typeof valueText === 'number' && isNaN(valueText)) ? "N/A" : valueText.toString()) : "N/A");
            }
        }

        setFieldText("#block-height", "Block Height", this.numBlocks, this.isUp);
        setFieldText("#difficulty", "Difficulty", this.difficulty, this.isUp);
        setFieldText("#best-block-hash", "Best Block Hash", this.bestBlockHash, this.isUp);
        setFieldText("#latest-block-time", "Latest Block Time", this.latestBlockTime ? new Date(this.latestBlockTime * 1000).toLocaleString() : "N/A", this.isUp);
        setFieldText("#num-peers", "Active Peers", this.peersConnected, this.isUp);
        setFieldText("#hash-rate", "Hash Rate", this.calculateHashRate(), this.isUp);
    }

    private calculateHashRate() {
        if (!isNaN(this.difficulty)) {
            const hashRate = this.difficulty * Math.pow(2, 32) / 600;
            return `${hashRate.toFixed(2)} H/s`;
        }
        return "N/A";
    }

    public updateDisplay() {
        display.displayNetworkStatus(this.isUp);
        display.displayBlockchainInfo(this.blockChainDetails);
        this.updateSummary();
    }

    public displayDown() {
        this.isUp = false;
        this.updateDisplay();
    }
}
