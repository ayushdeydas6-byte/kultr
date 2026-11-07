
// =====================================
// KULTR - CAMPUS CULTURE CLUB
// EVENT DATA
// =====================================

const events = [
    {
        id: 1,
        name: "Tech Innovation Summit",
        category: "Technology",
        date: "2026-11-15",
        venue: "KIIT Auditorium",
        description: "Explore groundbreaking technologies, artificial intelligence, robotics and the future of engineering. Connect with innovators and discover what's next.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
    },
    {
        id: 2,
        name: "Campus Music Night",
        category: "Music",
        date: "2026-11-20",
        venue: "Campus Open Ground",
        description: "An unforgettable evening filled with live performances, music, entertainment and incredible campus energy. Bring your friends and enjoy the night.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800"
    },
    {
        id: 3,
        name: "24-Hour Hackathon",
        category: "Technology",
        date: "2026-11-25",
        venue: "Innovation Lab",
        description: "Build, innovate and compete with talented developers. Turn your ideas into working solutions and challenge yourself in this 24-hour coding marathon.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    },
    {
        id: 4,
        name: "Inter-College Sports Meet",
        category: "Sports",
        date: "2026-12-02",
        venue: "KIIT Sports Complex",
        description: "Experience competitive sports, teamwork and athletic excellence. Represent your college and compete for glory.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800"
    },
    {
        id: 5,
        name: "Cultural Fiesta",
        category: "Cultural",
        date: "2026-12-10",
        venue: "Campus Central Lawn",
        description: "Celebrate creativity, dance, art, fashion and culture. An amazing celebration of talent, diversity and togetherness.",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800"
    },
    {
        id: 6,
        name: "Startup Pitch Day",
        category: "Technology",
        date: "2026-12-15",
        venue: "Conference Hall",
        description: "Present your startup ideas, connect with innovators and discover opportunities. Turn your entrepreneurial vision into reality.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800"
    }
];


// =====================================
// DOM ELEMENTS
// =====================================

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");

const modal = document.getElementById("registerModal");
const detailsModal = document.getElementById("detailsModal");

const form = document.getElementById("registrationForm");

let selectedCategory = "All";
let selectedEventId = null;


// =====================================
// FORMAT DATE
// =====================================

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


// =====================================
// DISPLAY EVENTS
// =====================================

function displayEvents() {

    const search = searchInput.value.trim().toLowerCase();

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(search) ||
            event.venue.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    eventGrid.innerHTML = "";

    if (filteredEvents.length === 0) {

        eventGrid.innerHTML = `
            <p class="no-events">
                No events found. Try another search!
            </p>
        `;

        return;
    }

    filteredEvents.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        const image = document.createElement("img");

        image.className = "event-image";
        image.src = event.image;
        image.alt = event.name;
        image.loading = "lazy";

        image.onerror = () => {
            image.onerror = null;
            image.src = "https://placehold.co/800x450/f3f0e7/344dff?text=KULTR";
        };

        const info = document.createElement("div");

        info.className = "event-info";

        info.innerHTML = `
            <span class="event-category">
                ${event.category.toUpperCase()}
            </span>

            <h3>${event.name}</h3>

            <p>${event.description}</p>

            <div class="event-meta">
                <span>📅 ${formatDate(event.date)}</span>
                <span>📍 ${event.venue}</span>
            </div>

            <button class="register-btn" data-id="${event.id}">
                REGISTER NOW ↗
            </button>

            <button class="details-btn" data-id="${event.id}">
                VIEW EVENT DETAILS +
            </button>
        `;

        card.appendChild(image);
        card.appendChild(info);

        eventGrid.appendChild(card);
    });
}


// =====================================
// CATEGORY FILTERING
// =====================================

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        displayEvents();
    });

});


// =====================================
// SEARCH EVENTS
// =====================================

searchInput.addEventListener("input", displayEvents);


// =====================================
// OPEN REGISTRATION MODAL
// =====================================

eventGrid.addEventListener("click", event => {

    const button = event.target.closest(".register-btn");

    if (!button) return;

    selectedEventId = Number(button.dataset.id);

    const selected = events.find(
        item => item.id === selectedEventId
    );

    if (!selected) return;

    document.getElementById("selectedEvent").textContent =
        "Registering for: " + selected.name;

    document.getElementById("message").textContent = "";

    modal.classList.add("show");
});


// =====================================
// OPEN EVENT SPOTLIGHT
// =====================================

eventGrid.addEventListener("click", event => {

    const button = event.target.closest(".details-btn");

    if (!button) return;

    const selected = events.find(
        item => item.id === Number(button.dataset.id)
    );

    if (!selected) return;

    document.getElementById("detailImage").src = selected.image;

    document.getElementById("detailImage").alt = selected.name;

    document.getElementById("detailCategory").textContent =
        selected.category.toUpperCase();

    document.getElementById("detailName").textContent =
        selected.name;

    document.getElementById("detailDescription").textContent =
        selected.description;

    document.getElementById("detailDate").textContent =
        formatDate(selected.date);

    document.getElementById("detailVenue").textContent =
        selected.venue;

    document.getElementById("detailRegister").dataset.id =
        selected.id;

    detailsModal.classList.add("show");
});


// =====================================
// CLOSE MODALS
// =====================================

function closeModal() {
    modal.classList.remove("show");
}

function closeDetails() {
    detailsModal.classList.remove("show");
}

document.getElementById("closeModal").addEventListener(
    "click",
    closeModal
);

document.getElementById("closeDetails").addEventListener(
    "click",
    closeDetails
);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});

detailsModal.addEventListener("click", event => {

    if (event.target === detailsModal) {
        closeDetails();
    }

});


// =====================================
// REGISTER FROM EVENT DETAILS
// =====================================

document.getElementById("detailRegister").addEventListener(
    "click",
    event => {

        selectedEventId = Number(event.currentTarget.dataset.id);

        const selected = events.find(
            item => item.id === selectedEventId
        );

        if (!selected) return;

        document.getElementById("selectedEvent").textContent =
            "Registering for: " + selected.name;

        document.getElementById("message").textContent = "";

        closeDetails();

        modal.classList.add("show");
    }
);


// =====================================
// REGISTRATION FORM VALIDATION
// =====================================

form.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const selected = events.find(
        item => item.id === selectedEventId
    );

    if (!selected) {
        alert("Please select an event first.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern = /^[6-9]\d{9}$/;

    if (name.length < 3) {
        alert("Please enter a valid full name.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Indian phone number.");
        return;
    }


    // GET EXISTING REGISTRATIONS

    let registrations = [];

    try {
        registrations = JSON.parse(
            localStorage.getItem("kultrRegistrations") || "[]"
        );

        if (!Array.isArray(registrations)) {
            registrations = [];
        }

    } catch (error) {
        registrations = [];
    }


    // CREATE NEW REGISTRATION

    const registration = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        event: selected.name,

        registeredAt: new Date().toISOString()

    };


    // SAVE IN LOCAL STORAGE

    registrations.push(registration);

    localStorage.setItem(
        "kultrRegistrations",
        JSON.stringify(registrations)
    );


    // SUCCESS MESSAGE

    document.getElementById("message").textContent =
        "✓ You're on the list! See you at " + selected.name + "!";

    form.reset();

    selectedEventId = null;

});


// =====================================
// CLOSE POPUPS USING ESCAPE KEY
// =====================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

        closeDetails();

    }

});


// =====================================
// INITIALIZE WEBSITE
// =====================================

displayEvents();

