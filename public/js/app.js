// Main JavaScript for ShoreSquad

// Map initialization
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('cleanup-map'), {
        center: { lat: 1.3521, lng: 103.8198 }, // Singapore coordinates
        zoom: 11
    });

    // Add sample cleanup locations (replace with real data)
    const cleanupLocations = [
        { lat: 1.3099, lng: 103.9131, title: 'East Coast Beach Cleanup' },
        { lat: 1.2494, lng: 103.8303, title: 'Sentosa Beach Cleanup' },
        { lat: 1.4043, lng: 103.7898, title: 'Sembawang Beach Cleanup' }
    ];

    cleanupLocations.forEach(location => addMarker(location));
}

function addMarker(location) {
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        animation: google.maps.Animation.DROP
    });

    markers.push(marker);

    // Add click listener for marker info
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="info-window">
                <h3>${location.title}</h3>
                <p>Next cleanup: June 15, 2025</p>
                <button onclick="joinCleanup('${location.title}')">Join Cleanup</button>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Weather data fetching
async function fetchWeatherData() {
    try {
        // Replace with actual weather API call
        const weatherData = {
            temp: '28°C',
            conditions: 'Sunny',
            tideLevel: 'Low Tide',
            windSpeed: '15 km/h'
        };

        updateWeatherDisplay(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherDisplay(data) {
    const weatherDiv = document.getElementById('weather-data');
    weatherDiv.innerHTML = `
        <div class="weather-info">
            <p>Temperature: ${data.temp}</p>
            <p>Conditions: ${data.conditions}</p>
            <p>Tide Level: ${data.tideLevel}</p>
            <p>Wind Speed: ${data.windSpeed}</p>
        </div>
    `;
}

// Event handling
function joinCleanup(eventTitle) {
    // Add join cleanup logic here
    console.log(`Joined cleanup: ${eventTitle}`);
    alert('Thanks for joining! Check your email for details.');
}

// Animation for statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    fetchWeatherData();
    animateStats();

    // Update weather every 30 minutes
    setInterval(fetchWeatherData, 1800000);

    // Wave animation optimization
    const wave = document.querySelector('.wave-animation');
    if (wave) {
        wave.style.willChange = 'transform';
    }

    // Mobile menu toggle
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-toggle';
    menuBtn.innerHTML = '☰';
    document.querySelector('.nav-content').prepend(menuBtn);

    menuBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
