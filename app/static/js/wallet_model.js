function openSettings() {
    console.log("Settings opened");
}

async function connect(connectorId) {
    if (connectorId === '1') {
        // MetaMask connection logic
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('MetaMask connected');
            } catch (error) {
                console.error('MetaMask connection error:', error);
            }
        } else {
            console.error('MetaMask not installed');
        }
    } else {
        console.log('Connecting to wallet with connector ID:', connectorId);
    }
}

function isIFramed() {
    return window.self !== window.top;
}
