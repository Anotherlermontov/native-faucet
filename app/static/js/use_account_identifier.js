function Web3Status() {
    const accountIdentifier = account.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : '0x1234...5678';
    const hasUnitag = false;
    const hasRecent = false;

    const handleWalletDropdownClick = () => {
        console.log('Wallet dropdown clicked');
        document.getElementById('choose-wallet-wrapper').style.display = 'block';
    };

    const handleDisconnect = () => {
        disconnectWallet();
    };

    const createStatusIcon = () => {
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('icon-wrapper');
        iconWrapper.style.width = '24px';
        iconWrapper.style.height = '24px';
        return iconWrapper;
    };

    const createLoader = () => {
        const loader = document.createElement('div');
        loader.classList.add('loader');
        loader.style.width = '24px';
        loader.style.height = '24px';
        return loader;
    };

    if ((account.isConnecting || account.isReconnecting) && hasRecent) {
        const connectingButton = document.createElement('button');
        connectingButton.classList.add('web3-status-connected');
        connectingButton.disabled = true;
        connectingButton.onclick = handleWalletDropdownClick;

        const iconWrapper = createStatusIcon();
        const loader = createLoader();
        iconWrapper.appendChild(loader);
        connectingButton.appendChild(iconWrapper);

        const addressContainer = document.createElement('div');
        addressContainer.classList.add('address-and-chevron-container');
        const text = document.createElement('span');
        text.classList.add('text');
        text.textContent = accountIdentifier;
        addressContainer.appendChild(text);
        connectingButton.appendChild(addressContainer);

        return connectingButton;
    }

    if (account.address) {
        const connectedButton = document.createElement('div');
        connectedButton.classList.add('web3-status-connected');
        connectedButton.style.display = 'flex';
        connectedButton.style.alignItems = 'center';
        connectedButton.style.justifyContent = 'space-between';
        connectedButton.style.width = 'auto';

        const addressContainer = document.createElement('div');
        addressContainer.classList.add('address-and-chevron-container');
        const text = document.createElement('span');
        text.classList.add('text');
        text.textContent = accountIdentifier;
        addressContainer.appendChild(text);

        if (hasUnitag) {
            const unitag = createStatusIcon(); // Placeholder for Unitag
            addressContainer.appendChild(unitag);
        }
        connectedButton.appendChild(addressContainer);

        const disconnectButton = document.createElement('button');
        disconnectButton.classList.add('disconnect-button');
        disconnectButton.onclick = handleDisconnect;
        disconnectButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7.3335C7.63133 7.3335 7.33333 7.03483 7.33333 6.66683V2.00016C7.33333 1.63216 7.63133 1.3335 8 1.3335C8.36867 1.3335 8.66667 1.63216 8.66667 2.00016V6.66683C8.66667 7.03483 8.36867 7.3335 8 7.3335ZM14 8.66683C14 6.5375 12.8506 4.5462 11.002 3.47087C10.6833 3.28553 10.2753 3.39343 10.0907 3.71143C9.90532 4.03009 10.0134 4.43822 10.3314 4.62288C11.772 5.46088 12.6667 7.01083 12.6667 8.66683C12.6667 11.2402 10.5727 13.3335 8 13.3335C5.42733 13.3335 3.33333 11.2402 3.33333 8.66683C3.33333 7.01083 4.22795 5.46088 5.66862 4.62288C5.98729 4.43822 6.09534 4.02943 5.90934 3.71143C5.72334 3.39343 5.31538 3.2842 4.99805 3.47087C3.14938 4.54687 2 6.5375 2 8.66683C2 11.9748 4.69133 14.6668 8 14.6668C11.3087 14.6668 14 11.9748 14 8.66683Z" fill="currentColor"/>
            </svg>
        `;

        // connectedButton.onclick = handleWalletDropdownClick; // Ensure only clicking the address triggers the dropdown


        connectedButton.appendChild(disconnectButton);

        return connectedButton;
    } else {
        const connectWrapper = document.createElement('div');
        connectWrapper.classList.add('web3-status-connect-wrapper');
        connectWrapper.tabIndex = 0;
        connectWrapper.onclick = handleWalletDropdownClick;
        connectWrapper.onkeypress = (e) => {
            if (e.key === 'Enter') handleWalletDropdownClick();
        };

        const connectButton = document.createElement('button');
        connectButton.classList.add('styled-connect-button');
        connectButton.tabIndex = -1;
        connectButton.textContent = 'Connect Wallet';

        connectWrapper.appendChild(connectButton);
        return connectWrapper;
    }
}

function disconnectWallet() {
    account.address = null;
    const web3StatusContainer = document.getElementById('web3-status');
    web3StatusContainer.innerHTML = '';  // Clear previous content
    web3StatusContainer.appendChild(Web3Status());  // Render the updated Web3Status
}
