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

