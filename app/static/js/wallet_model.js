function openSettings() {
    console.log("Settings opened");
}

async function connect(connectorId) {
    if (connectorId === '1') {
        // MetaMask connection logic
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    // Set the account address to the first account
                    account.address = accounts[0];
                    console.log('MetaMask connected:', account.address);

                    // Re-render Web3Status with the connected account
                    const web3StatusContainer = document.getElementById('web3-status');
                    web3StatusContainer.innerHTML = '';  // Clear previous content
                    web3StatusContainer.appendChild(Web3Status());  // Render the updated Web3Status
                }
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
