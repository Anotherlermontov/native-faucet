function showMailFormWallet() {
    showMailForm('connect_wallet_clicked');
}

function Web3Status() {
    const connectWrapper = document.createElement('div');
    connectWrapper.classList.add('web3-status-connect-wrapper');
    connectWrapper.tabIndex = 0;
    connectWrapper.onclick = showMailFormWallet;

    const connectButton = document.createElement('button');
    connectButton.classList.add('styled-connect-button');
    connectButton.tabIndex = -1;
    connectButton.textContent = 'Connect Wallet';

    connectWrapper.appendChild(connectButton);
    return connectWrapper;
}
