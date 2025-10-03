// Filter tabs functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const nftCards = document.querySelectorAll('.nft-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const category = tab.textContent.trim();

        // Filter NFT cards
        nftCards.forEach(card => {
            if (category === 'All Items') {
                card.style.display = 'block';
            } else {
                const cardBadge = card.querySelector('.nft-badge').textContent;
                if (cardBadge === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });

        toast.info(`Filtering by: ${category}`);
    });
});

// Buy button functionality
const buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const nftCard = button.closest('.nft-card');
        const nftTitle = nftCard.querySelector('.nft-title').textContent;
        const price = nftCard.querySelector('.price-value').textContent;

        toast.info(`Purchasing ${nftTitle} for ${price}...`);

        // Simulate purchase
        button.textContent = 'Processing...';
        button.disabled = true;

        setTimeout(() => {
            toast.success(`Successfully purchased ${nftTitle}!`);
            button.textContent = 'Owned';
            button.style.background = 'rgba(16, 185, 129, 0.8)';
        }, 2000);
    });
});

// NFT Modal Elements
const nftModal = document.getElementById('nftModal');
const closeNftModal = document.getElementById('closeNftModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCreator = document.getElementById('modalCreator');
const modalBadge = document.getElementById('modalBadge');
const modalPrice = document.getElementById('modalPrice');
const modalBuyBtn = document.getElementById('modalBuyBtn');

// NFT Card click to view details
nftCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking buy button
        if (e.target.classList.contains('btn-buy')) return;

        // Get NFT data from card
        const nftTitle = card.querySelector('.nft-title').textContent;
        const nftCreator = card.querySelector('.nft-creator').textContent.replace('By ', '');
        const nftImage = card.querySelector('.nft-image img').src;
        const nftBadge = card.querySelector('.nft-badge').textContent;
        const nftPrice = card.querySelector('.price-value').textContent;

        // Populate modal with data
        modalTitle.textContent = nftTitle;
        modalCreator.textContent = nftCreator;
        modalImage.src = nftImage;
        modalBadge.textContent = nftBadge;
        modalPrice.textContent = nftPrice;

        // Show modal
        nftModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close modal
closeNftModal.addEventListener('click', closeModal);
nftModal.addEventListener('click', (e) => {
    if (e.target === nftModal) closeModal();
});

function closeModal() {
    nftModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Modal Buy Button
modalBuyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nftTitle = modalTitle.textContent;
    const price = modalPrice.textContent;

    toast.info(`Initiating purchase of ${nftTitle} for ${price}...`);

    modalBuyBtn.textContent = 'Processing...';
    modalBuyBtn.disabled = true;

    setTimeout(() => {
        toast.success(`Successfully purchased ${nftTitle}!`);
        modalBuyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/></svg> Owned';
        modalBuyBtn.style.background = 'rgba(16, 185, 129, 0.8)';
        modalBuyBtn.disabled = false;
    }, 2000);
});

// Make Offer Button
const offerBtn = document.querySelector('.btn-modal-offer');
offerBtn.addEventListener('click', () => {
    toast.info('Make Offer feature coming soon!');
});

// View Seller Profile Button
const viewSellerBtn = document.querySelector('.btn-seller-view');
viewSellerBtn.addEventListener('click', () => {
    toast.info('Seller profile feature coming soon!');
});

// Sort functionality
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', (e) => {
    const sortType = e.target.value;
    toast.info(`Sorting by: ${sortType}`);

    // Here you would implement actual sorting logic
    // For now, just show a message
});
