function Web3Status() {
    const accountIdentifier = account.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : '0x1234...5678';
    const hasUnitag = false;
    const hasRecent = false;

    const handleWalletDropdownClick = () => {
        console.log('Wallet dropdown clicked');
        document.getElementById('choose-wallet-wrapper').style.display = 'block';
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
        const connectedButton = document.createElement('button');
        connectedButton.classList.add('web3-status-connected');
        connectedButton.onclick = handleWalletDropdownClick;

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
