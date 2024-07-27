const FULL_BORDER_RADIUS = 9999;

const theme = {
    accent1: '#ff007a',
    accent2: '#f0f4f7',
    surface1: '#ffffff',
    surface2: '#f5f5f5',
    surface3: '#e5e5e5',
    neutral1: '#333333',
    white: '#ffffff',
    breakpoint: { lg: 1024 },
    opacity: { disabled: 0.6 },
    transition: { duration: { fast: '0.3s' }, timing: { in: 'ease-in' } }
};

const darken = (color, percentage) => {
    const f = parseInt(color.slice(1), 16),
    t = percentage < 0 ? 0 : 255,
    p = percentage < 0 ? percentage * -1 : percentage,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
    return (
    '#' +
    (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
    )
        .toString(16)
        .slice(1)
    );
};

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
