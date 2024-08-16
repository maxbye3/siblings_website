window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const curtainLeft = document.querySelector('.curtain-left');
    const curtainRight = document.querySelector('.curtain-right');
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate the percentage of the page that has been scrolled
    const scrollPercent = Math.min(scrollTop / maxScroll, 1);

    // Move the curtains towards the center based on the scroll percentage
    curtainLeft.style.transform = `translateX(${scrollPercent * 100}%)`;
    curtainRight.style.transform = `translateX(-${scrollPercent * 100}%)`;
});
