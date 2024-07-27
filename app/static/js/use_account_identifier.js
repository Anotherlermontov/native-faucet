function Web3Status() {
    const account = {
        address: null,
        isConnecting: false,
        isReconnecting: false
    };

    const switchingChain = false;
    const hasPendingActivity = false;
    const pendingActivityCount = 0;
    const accountIdentifier = '0x1234...5678';
    const hasUnitag = false;
    const hasRecent = false;

    const handleWalletDropdownClick = () => {
        console.log('Wallet dropdown clicked');
        document.getElementById('new-functionality').style.display = 'block';
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
        addressContainer.style.opacity = theme.opacity.disabled;
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
        connectedButton.disabled = Boolean(switchingChain);
        connectedButton.onclick = handleWalletDropdownClick;
        connectedButton.style.backgroundColor = hasPendingActivity ? theme.accent1 : theme.surface1;
        connectedButton.style.border = `1px solid ${hasPendingActivity ? theme.accent1 : theme.surface1}`;
        connectedButton.style.color = hasPendingActivity ? theme.white : theme.neutral1;

        if (hasPendingActivity) {
            const rowBetween = document.createElement('div');
            rowBetween.classList.add('row-between');
            const text = document.createElement('span');
            text.classList.add('text');
            text.textContent = `Pending (${pendingActivityCount})`;
            const loader = createLoader();
            rowBetween.appendChild(text);
            rowBetween.appendChild(loader);
            connectedButton.appendChild(rowBetween);
        } else {
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
        }
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
