function showThumbnail() {
    const videoUrl = document.getElementById('videoUrl').value;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);

    if (match) {
        const videoId = match[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        const thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" alt="Video Thumbnail">`;

        const thumbnailLinkAbove = document.getElementById('thumbnailLinkAbove');
        const thumbnailLinkBelow = document.getElementById('thumbnailLinkBelow');

        thumbnailLinkAbove.innerHTML = `<p><a href="${thumbnailUrl}" download>Download Thumbnail (Above)</a></p>`;
        thumbnailLinkBelow.innerHTML = `<p><a href="${thumbnailUrl}" download>Download Thumbnail (Below)</a></p>`;

    } else {
        alert('Invalid YouTube video URL. Please enter a valid URL.');
    }
}
