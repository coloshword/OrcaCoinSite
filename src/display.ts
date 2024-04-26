// display.ts: handles changing display of the page 
export function displayNetworkStatus(isUp: boolean) {
    const statusIndicator = document.querySelector('.status-indicator') as HTMLElement;
    if (statusIndicator != null) {
        if(isUp) {
            statusIndicator.style.fill = '#349139';
        } else {
            statusIndicator.style.fill = '#a83232';
        }
    }

}

export function displayBlockchainInfo(bcDetails: string ) {
    const bcContainer = document.querySelector('.blockchain-details') as HTMLElement;
    if (bcContainer != null) {
        bcContainer.innerHTML = `<pre>${bcDetails}</pre>`;
    }
}

export function displayBlockChainSummary(bcObj: Object) {
    const bcSummary = document.querySelector('.blockchain-summary') as HTMLElement;
}
