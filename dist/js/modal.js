function openModal() {
    let mediaSrc = null;
    const activeItem = document.querySelector('.carousel-item.active');
    console.log("For Video :", activeItem);
    let isVideo=false;

    if (activeItem) {
        const image = activeItem.querySelector('img');
        const video = activeItem.querySelector('video');
        mediaSrc = video ? video.querySelector('source').src : image?.src || null; 
        isVideo=video;
        // Create the modal HTML structure
        const modalHTML = `
            <div id="myModal" class="modal">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <img id="modalImage" src="" alt="" style="display: none;">
                    <video id="modalVideo" autoplay loop muted playsinline style="display: none;"></video>
                </div>
            </div>
        `;

        // Append the modal to the body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add event listener to close modal when clicking outside of modal content
        const modal = document.getElementById("myModal");
        modal.addEventListener('click', closeModal);
    }

    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");

    // Hide both initially
    modalImage.style.display = "none";
    modalVideo.style.display = "none";

    if (isVideo) {
        modalVideo.src = mediaSrc;
        modalVideo.style.display = "block";
    } else {
        modalImage.src = mediaSrc;
        modalImage.style.display = "block";
    }

    modal.classList.add("show");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
        modal.remove(); // Remove modal from DOM to clean up
    }, 300);

    // Pause video when closing
    const modalVideo = document.getElementById("modalVideo");
    if (modalVideo) {
        modalVideo.pause();
    }
}
