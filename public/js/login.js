let currentPayloadUuid = null;

const connectBtn = document.getElementById('connectBtn');
const qrModal = document.getElementById('qrModal');
const closeModal = document.getElementById('closeModal');
const qrCode = document.getElementById('qrCode');

connectBtn.addEventListener('click', initiateLogin);
closeModal.addEventListener('click', closeQRModal);
qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQRModal();
});

async function initiateLogin() {
    try {
        connectBtn.disabled = true;
        connectBtn.textContent = 'Connecting...';

        // Step 1: Create payload and get QR code
        const response = await fetch('/api/auth/login', { method: 'POST' });
        const result = await response.json();

        if (result.success) {
            currentPayloadUuid = result.data.uuid;
            qrCode.src = result.data.qrUrl;
            qrModal.classList.remove('hidden');
            toast.success('QR Code generated - Scan with Xaman app');

            // Step 2: Wait for user to sign (backend will wait for WebSocket)
            toast.info('Waiting for signature...');
            const verifyRes = await fetch(`/api/auth/verify/${currentPayloadUuid}`, { method: 'POST' });
            const verifyData = await verifyRes.json();

            if (verifyData.success && verifyData.signed) {
                toast.success('Wallet connected successfully!');
                setTimeout(() => window.location.href = '/dashboard', 1000);
            } else if (verifyData.expired) {
                toast.error('QR code expired');
                closeQRModal();
            } else {
                toast.error('Sign request rejected');
                closeQRModal();
            }
        } else {
            toast.error(result.message || 'Failed to generate QR code');
        }
    } catch (error) {
        toast.error('Connection failed - Please try again');
        closeQRModal();
    } finally {
        connectBtn.disabled = false;
        connectBtn.textContent = 'Connect Wallet';
    }
}

function closeQRModal() {
    currentPayloadUuid = null;
    qrModal.classList.add('hidden');
}
