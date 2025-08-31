// Modern JavaScript for Sungroups website
const SHEETDB_API = "https://sheetdb.io/api/v1/9s3as0axxyn67";

// Utility Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    popup.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Sungroups Team</h3>
            <p class="text-gray-600 mb-6">${message}</p>
            <button onclick="this.closest('.fixed').remove()" 
                    class="w-full bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300">
                OK
            </button>
        </div>
    `;
    document.body.appendChild(popup);
}

function formDataToSheetDBJson(formData) {
    const row = {};
    formData.forEach((value, key) => {
        const match = key.match(/data\[(.+)\]/);
        if (match) {
            row[match[1]] = value;
        }
    });
    return { data: [row] };
}

// Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector("button[type='submit']");
        
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get("data[Name]");
            const email = formData.get("data[Email]");
            const phone = formData.get("data[Phone]");

            // Validation
            if (!name || name.length > 21 || name.length < 4) {
                showPopup("Please enter a valid name (4-21 characters)");
                return;
            }

            if (!email || !isValidEmail(email)) {
                showPopup("Please enter a valid email address");
                return;
            }

            if (!phone || phone.length !== 10) {
                showPopup("Please enter a valid 10-digit phone number");
                return;
            }

            const payload = formDataToSheetDBJson(formData);
            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            fetch(SHEETDB_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("SheetDB Response:", data);
                showPopup("Thank you for your trust! We will connect with you soon.");
                contactForm.reset();
                submitBtn.textContent = "Submitted ✓";
                
                setTimeout(() => {
                    submitBtn.textContent = "Get Free Quote";
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error("Error:", error);
                showPopup("Error submitting form. Please try again.");
                submitBtn.textContent = "Get Free Quote";
                submitBtn.disabled = false;
            });
        });
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
});

// Logo Animation
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('img[alt="Sungroups Logo"]');
    if (logo) {
        logo.addEventListener("click", () => {
            logo.style.transform = "scale(1.2)";
            logo.style.transition = "transform 0.3s ease";
            
            setTimeout(() => {
                logo.style.transform = "scale(1)";
            }, 300);
        });
    }
});