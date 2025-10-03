// Upload area elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const uploadPlaceholder = uploadArea.querySelector('.upload-placeholder');

// Click to upload
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#8b5cf6';
    uploadArea.style.background = 'rgba(139, 92, 246, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.05)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    uploadArea.style.background = 'rgba(255, 255, 255, 0.05)';

    const file = e.dataTransfer.files[0];
    if (file) {
        handleFile(file);
    }
});

// File input change
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

function handleFile(file) {
    // Check file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
        toast.error('File size must be less than 100MB');
        return;
    }

    // Check file type
    if (!file.type.match('image.*') && !file.type.match('video.*')) {
        toast.error('Only image and video files are allowed');
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.classList.remove('hidden');
        uploadPlaceholder.style.display = 'none';
        toast.success('File uploaded successfully!');
    };
    reader.readAsDataURL(file);
}

// Form submission
const createNftForm = document.getElementById('createNftForm');

createNftForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nftName = document.getElementById('nftName').value;
    const nftDescription = document.getElementById('nftDescription').value;
    const nftCategory = document.getElementById('nftCategory').value;
    const nftPrice = document.getElementById('nftPrice').value;
    const nftRoyalty = document.getElementById('nftRoyalty').value;
    const nftSupply = document.getElementById('nftSupply').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (!previewImage.src || previewImage.classList.contains('hidden')) {
        toast.error('Please upload a file');
        return;
    }

    if (!nftName || !nftCategory || !nftPrice || !nftSupply) {
        toast.error('Please fill in all required fields');
        return;
    }

    if (!agreeTerms) {
        toast.error('Please agree to the terms and conditions');
        return;
    }

    // Simulate NFT creation
    const submitBtn = createNftForm.querySelector('.btn-create');
    submitBtn.textContent = 'Creating...';
    submitBtn.disabled = true;

    toast.info('Creating NFT on XRP Ledger...');

    setTimeout(() => {
        toast.success(`Successfully created "${nftName}"!`);

        setTimeout(() => {
            window.location.href = '/mynfts';
        }, 1500);
    }, 3000);
});

// Real-time price conversion (mock USD rate)
const priceInput = document.getElementById('nftPrice');
priceInput.addEventListener('input', (e) => {
    const xrpAmount = parseFloat(e.target.value);
    if (xrpAmount && xrpAmount > 0) {
        const usdValue = (xrpAmount * 0.5).toFixed(2); // Mock conversion rate
        toast.info(`≈ $${usdValue} USD`, 1000);
    }
});
