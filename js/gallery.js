// Custom Photo Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const photoItems = document.querySelectorAll('.photo-item');

    let currentImageIndex = 0;
    let images = [];

    // Collect all image sources
    photoItems.forEach((item, index) => {
        images.push({
            src: item.getAttribute('data-src'),
            alt: item.getAttribute('data-alt')
        });
    });

    // Open modal when photo is clicked
    photoItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentImageIndex = index;
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
    }

    // Next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
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
