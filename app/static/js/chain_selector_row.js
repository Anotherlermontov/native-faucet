const NETWORK_SELECTOR_CHAINS = [1];
const TESTNET_CHAIN_IDS = [];
const CONNECTION = {
    UNISWAP_WALLET_CONNECT_CONNECTOR_ID: 'uniswap_wallet_connect_connector_id',
    WALLET_CONNECT_CONNECTOR_ID: 'wallet_connect_connector_id'
};
const account = {
    connector: { type: CONNECTION.UNISWAP_WALLET_CONNECT_CONNECTOR_ID, getNamespaceChainsIds: () => NETWORK_SELECTOR_CHAINS },
    chainId: 1
};
const CHAIN_ID_TO_LOGO_FILENAME = {
    1: "ethereum-logo",
}
// const theme = { accent1: '#ff0000', neutral2: '#888888' };
const multichainUXEnabled = true;
const swapChainId = 1;
const chainId = multichainUXEnabled ? swapChainId : account.chainId;
const supportedChains = NETWORK_SELECTOR_CHAINS.filter(chain => !TESTNET_CHAIN_IDS.includes(chain));
const unsupportedChains = TESTNET_CHAIN_IDS;

function createChainRow(chain, isSupported) {
    const row = document.createElement('div');
    row.className = `chain-row ${isSupported ? '' : 'disabled'}`;
    row.innerHTML = `
        <img src="/static/images/logos/${CHAIN_ID_TO_LOGO_FILENAME[chain]}.png" alt="Chain Logo" width="20" height="20" style="margin-right: 12px;">
        <div class="label">Chain ${chain}</div>
        <div class="status">${isSupported ? '' : '<div class="caption-text">Unsupported</div>'}</div>
    `;
    row.addEventListener('click', () => {
        if (isSupported) {
            console.log(`Selected chain: ${chain}`);
        }
    });
    return row;
}
