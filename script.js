/* =====================================================
PAD A GIRL FOUNDATION
PART 3 - JAVASCRIPT FUNCTIONALITY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

/* ================================================
1. GALLERY LIGHTBOX
================================================ */

const galleryImages = document.querySelectorAll(".gallery-grid img");

if (galleryImages.length > 0) {

const lightbox = document.createElement("div");

lightbox.id = "lightbox";
lightbox.className = "lightbox";

lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Image viewer");
lightbox.setAttribute("aria-hidden", "true");

lightbox.innerHTML = `
<button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>

<button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button>

<figure>
    <img src="" alt="">
    <figcaption></figcaption>
</figure>

<button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const caption = lightbox.querySelector("figcaption");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");

let currentImageIndex = 0;
let lastFocusedElement = null;

function showImage(index) {

currentImageIndex =
(index + galleryImages.length) % galleryImages.length;

const selectedImage = galleryImages[currentImageIndex];

lightboxImage.src = selectedImage.src;
lightboxImage.alt = selectedImage.alt;

caption.textContent = selectedImage.alt;
}

function openLightbox(index) {

lastFocusedElement = document.activeElement;

showImage(index);

lightbox.classList.add("active");
lightbox.setAttribute("aria-hidden", "false");

document.body.style.overflow = "hidden";

closeButton.focus();
}

function closeLightbox() {

lightbox.classList.remove("active");
lightbox.setAttribute("aria-hidden", "true");

document.body.style.overflow = "";

if (lastFocusedElement) {
lastFocusedElement.focus();
}
}

galleryImages.forEach(function (image, index) {

image.style.cursor = "zoom-in";

image.setAttribute("tabindex", "0");
image.setAttribute("role", "button");

image.setAttribute(
"aria-label",
"View larger image: " + image.alt
);

image.addEventListener("click", function () {
openLightbox(index);
});

image.addEventListener("keydown", function (event) {

if (event.key === "Enter" || event.key === " ") {

event.preventDefault();
openLightbox(index);
}

});

});

closeButton.addEventListener("click", closeLightbox);

previousButton.addEventListener("click", function () {
showImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", function () {
showImage(currentImageIndex + 1);
});

lightbox.addEventListener("click", function (event) {

if (event.target === lightbox) {
closeLightbox();
}

});

document.addEventListener("keydown", function (event) {

if (!lightbox.classList.contains("active")) {
return;
}

if (event.key === "Escape") {
closeLightbox();
}

if (event.key === "ArrowRight") {
showImage(currentImageIndex + 1);
}

if (event.key === "ArrowLeft") {
showImage(currentImageIndex - 1);
}

});

}


/* ================================================
2. SERVICE SEARCH AND FILTER
================================================ */

const serviceSearch = document.getElementById("serviceSearch");

const serviceItems = document.querySelectorAll(".service-item");

const searchMessage = document.getElementById("searchMessage");

if (serviceSearch && serviceItems.length > 0) {

function filterServices() {

const searchTerm = serviceSearch.value
.trim()
.toLowerCase();

let visibleCount = 0;

serviceItems.forEach(function (item) {

const serviceText = item.textContent.toLowerCase();

const matches = serviceText.includes(searchTerm);

item.hidden = !matches;

if (matches) {
visibleCount++;
}

});

if (searchMessage) {

if (visibleCount === 0) {

searchMessage.textContent =
"No services found. Please try another search.";

} else {

searchMessage.textContent =
visibleCount + " service(s) found.";

}

}

}

serviceSearch.addEventListener("input", filterServices);

}


/* ================================================
3. ENQUIRY FORM VALIDATION AND RESPONSE
================================================ */

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

const enquiryMessage =
document.getElementById("enquiryMessage");

const enquiryType =
document.getElementById("enquiryType");

enquiryForm.addEventListener("submit", function (event) {

event.preventDefault();

if (!enquiryForm.checkValidity()) {

enquiryForm.reportValidity();

return;
}

const name =
document.getElementById("enquiryName").value.trim();

const selectedType = enquiryType.value;

const responseMessages = {

products:
"Thank you for your interest in menstrual products. " +
"Please contact our team to discuss product availability " +
"and possible support.",

education:
"Thank you for your interest in menstrual health education. " +
"Please contact our team to discuss educational opportunities.",

volunteer:
"Thank you for wanting to volunteer with Pad A Girl. " +
"Our team will need to confirm current volunteering opportunities.",

sponsor:
"Thank you for considering sponsoring Pad A Girl. " +
"Please contact our team to discuss possible sponsorship arrangements.",

donations:
"Thank you for your interest in donating. " +
"Please contact our team to discuss donation arrangements."
};

if (enquiryMessage) {

enquiryMessage.textContent =
"Thank you, " + name + "! " +
(responseMessages[selectedType] ||
"Thank you for your enquiry. Please contact our team for assistance.");

enquiryMessage.classList.add("success-message");

enquiryMessage.hidden = false;

enquiryMessage.scrollIntoView({
behavior: "smooth",
block: "nearest"
});

}

enquiryForm.reset();

});

}


/* ================================================
4. CONTACT FORM VALIDATION
AND EMAIL PREPARATION
================================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

const contactMessage =
document.getElementById("contactMessage");

contactForm.addEventListener("submit", function (event) {

event.preventDefault();

if (!contactForm.checkValidity()) {

contactForm.reportValidity();

return;
}

const name =
document.getElementById("contactName").value.trim();

const email =
document.getElementById("contactEmail").value.trim();

const phone =
document.getElementById("contactPhone").value.trim();

const category =
document.getElementById("messageType").value;

const message =
document.getElementById("message").value.trim();

const subject =
"Pad A Girl Website Enquiry: " + category;

const emailBody =
"Name: " + name + "\n" +
"Email: " + email + "\n" +
"Phone: " + (phone || "Not provided") + "\n" +
"Message category: " + category + "\n\n" +
"Message:\n" + message;

const emailLink =
"mailto:info@padagirlsa.co.za" +
"?subject=" + encodeURIComponent(subject) +
"&body=" + encodeURIComponent(emailBody);

if (contactMessage) {

contactMessage.textContent =
"Your information has been validated. " +
"Your email application will open so you can review " +
"and send your message.";

contactMessage.classList.add("success-message");

contactMessage.hidden = false;
}

window.location.href = emailLink;

});

}

});