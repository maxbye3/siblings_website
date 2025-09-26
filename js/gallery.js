// Custom Photo Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const photoItems = document.querySelectorAll('.photo-item');

    let currentImageIndex = 0;
    let images = [];
    let loadedImages = new Set(); // Cache for loaded full-res images

    // Collect all image sources
    photoItems.forEach((item, index) => {
        images.push({
            src: item.getAttribute('data-src'),
            alt: item.getAttribute('data-alt')
        });
    });

    // Show loading state
    function showLoading() {
        modalImage.style.opacity = '0.3';
        modalImage.style.filter = 'blur(5px)';

        // Add loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'modal-loading';
        loadingSpinner.id = 'loadingSpinner';
        modal.querySelector('.modal-content').appendChild(loadingSpinner);
    }

    // Hide loading state
    function hideLoading() {
        modalImage.style.opacity = '1';
        modalImage.style.filter = 'none';

        // Remove loading spinner
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.remove();
        }
    }

    // Load full-resolution image with loading state
    function loadFullResImage(imageSrc, imageAlt) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                hideLoading();
                resolve(img);
            };
            img.onerror = () => {
                hideLoading();
                reject(new Error('Failed to load image'));
            };
            img.src = imageSrc;
        });
    }

    // Open modal when photo is clicked
    photoItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentImageIndex = index;
            const imageData = images[currentImageIndex];

            // Show modal immediately with loading state
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Show loading state
            showLoading();

            // Load full-resolution image
            loadFullResImage(imageData.src, imageData.alt)
                .then(() => {
                    modalImage.src = imageData.src;
                    modalImage.alt = imageData.alt;
                    loadedImages.add(imageData.src);
                })
                .catch((error) => {
                    console.error('Error loading image:', error);
                    // Fallback to thumbnail if full-res fails
                    modalImage.src = item.querySelector('img').src;
                    modalImage.alt = imageData.alt;
                });
        });
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }


    // Close modal when clicking outside the photo or navigation
    modal.addEventListener('click', function (e) {
        // Close if clicking on modal background or anything except the image and navigation buttons
        if (e.target === modal ||
            (e.target !== modalImage &&
                e.target !== prevBtn &&
                e.target !== nextBtn &&
                !modalImage.contains(e.target) &&
                !prevBtn.contains(e.target) &&
                !nextBtn.contains(e.target))) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Previous image
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const imageData = images[currentImageIndex];

        // Check if image is already loaded
        if (loadedImages.has(imageData.src)) {
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;
        } else {
            showLoading();
            loadFullResImage(imageData.src, imageData.alt)
                .then(() => {
                    modalImage.src = imageData.src;
                    modalImage.alt = imageData.alt;
                    loadedImages.add(imageData.src);
                })
                .catch((error) => {
                    console.error('Error loading image:', error);
                    modalImage.src = imageData.src;
                    modalImage.alt = imageData.alt;
                });
        }
    }

    // Next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const imageData = images[currentImageIndex];

        // Check if image is already loaded
        if (loadedImages.has(imageData.src)) {
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;
        } else {
            showLoading();
            loadFullResImage(imageData.src, imageData.alt)
                .then(() => {
                    modalImage.src = imageData.src;
                    modalImage.alt = imageData.alt;
                    loadedImages.add(imageData.src);
                })
                .catch((error) => {
                    console.error('Error loading image:', error);
                    modalImage.src = imageData.src;
                    modalImage.alt = imageData.alt;
                });
        }
    }

    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
});
