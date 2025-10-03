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

// NFT Card click to view details
nftCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking buy button
        if (e.target.classList.contains('btn-buy')) return;

        const nftTitle = card.querySelector('.nft-title').textContent;
        toast.info(`Viewing details for ${nftTitle}`);
    });
});

// Sort functionality
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', (e) => {
    const sortType = e.target.value;
    toast.info(`Sorting by: ${sortType}`);

    // Here you would implement actual sorting logic
    // For now, just show a message
});
