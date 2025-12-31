import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Gallery.css";
import lalibela from '../..//public/images/gallery/lalibela.jpg'
import semen from '../..//public/images/gallery/semen.jpg'
import denakil from '../..//public/images/gallery/denakil.jpg'
import harar from '../..//public/images/gallery/harar.jpg'
import omo from '../..//public/images/gallery/omo.jpg'
import nile from '../..//public/images/gallery/nile.jpg'
import axum from '../..//public/images/gallery/axum.jpg'
import bale from '../..//public/images/gallery/bale.jpg'
import tana from '../..//public/images/gallery/tana.jpg'
import konso from '../..//public/images/gallery/konso.jpg'
import church from '../..//public/images/gallery/church.jpg'
import coffee from '../..//public/images/gallery/coffee.jpg'











const destinations = {
  lalibela: {
    title: "Rock-hewn Churches of Lalibela",
    image: lalibela,
    price: 299,
    description:
      "Carved directly into volcanic rock in the 12th century, these churches represent one of the world's greatest architectural achievements.",
    location: "Lalibela, Amhara Region",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Visit all 11 rock-hewn churches",
      "Traditional Ethiopian coffee ceremony",
      "Local cultural performances",
      "Professional guide included",
    ],
    hotels: [
      { name: "Lalibela Lodge", rating: "⭐⭐⭐⭐⭐", price: "$180/night | ETB 23,400" },
      { name: "Mountain View Hotel", rating: "⭐⭐⭐⭐", price: "$120/night | ETB 15,600" },
      { name: "Roha Hotel", rating: "⭐⭐⭐", price: "$80/night | ETB 10,400" },
    ],
  },
  simien: {
    title: "Simien Mountains National Park",
    image: semen,
    price: 449,
    description:
      "Dramatic escarpments, valleys, and unique wildlife like the Gelada baboon and Ethiopian wolf make this Africa's best trekking destination.",
    location: "Simien Mountains National Park, Amhara",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Guided mountain trekking",
      "Wildlife spotting opportunities",
      "Camping under the stars",
      "Local guide and porters included",
    ],
    hotels: [
      { name: "Simien Lodge", rating: "⭐⭐⭐⭐⭐", price: "$200/night | ETB 26,000" },
      { name: "Debark Hotel", rating: "⭐⭐⭐", price: "$90/night | ETB 11,700" },
      { name: "Mountain Campsite", rating: "⭐⭐⭐", price: "$50/night | ETB 6,500" },
    ],
  },
  danakil: {
    title: "Danakil Depression",
    image: denakil,
    price: 599,
    description:
      "One of the hottest, lowest, and most geologically active places on Earth, featuring salt flats, sulfur springs, and volcanoes.",
    location: "Danakil Depression, Afar Region",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Visit Erta Ale volcano",
      "Salt mining experience",
      "Dallol hydrothermal field",
      "4WD vehicle included",
    ],
    hotels: [
      { name: "Afar Lodge", rating: "⭐⭐⭐⭐", price: "$160/night | ETB 20,800" },
      { name: "Desert Camp", rating: "⭐⭐⭐", price: "$100/night | ETB 13,000" },
      { name: "Basic Camping", rating: "⭐⭐", price: "$60/night | ETB 7,800" },
    ],
  },
  harar: {
    title: "Historic Fortified City of Harar",
    image: harar,
    price: 349,
    description:
      "Known as the fourth holy city of Islam, Harar has 82 mosques, over 100 shrines, and unique cultural heritage.",
    location: "Harari Region",
    duration: "2 Days / 1 Night",
    highlights: [
      "Visit the old walled city",
      "Hyena feeding experience",
      "Traditional Harari houses",
      "Cultural museum visit",
    ],
    hotels: [
      { name: "Wonderland Hotel", rating: "⭐⭐⭐⭐", price: "$120/night | ETB 15,600" },
      { name: "Heritage Plaza", rating: "⭐⭐⭐", price: "$90/night | ETB 11,700" },
      { name: "City View Hotel", rating: "⭐⭐⭐", price: "$70/night | ETB 9,100" },
    ],
  },
  omo: {
    title: "Omo Valley Cultural Heritage",
    image: omo,
    price: 399,
    description:
      "Diverse indigenous communities with unique customs, languages, and artistic expressions live in the Omo Valley.",
    location: "Omo Valley, Southern Nations",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Visit multiple tribal communities",
      "Traditional ceremonies",
      "Local handicraft workshops",
      "Cultural expert guide",
    ],
    hotels: [
      { name: "Omo Valley Lodge", rating: "⭐⭐⭐⭐", price: "$140/night | ETB 18,200" },
      { name: "Turmi Lodge", rating: "⭐⭐⭐", price: "$100/night | ETB 13,000" },
      { name: "Community Guesthouse", rating: "⭐⭐", price: "$70/night | ETB 9,100" },
    ],
  },
  bluenile: {
    title: "Blue Nile Falls (Tis Abay)",
    image: nile,
    price: 249,
    description:
      "Known as 'Tis Abay' or 'smoking water,' these 45-meter waterfalls are most spectacular during the rainy season.",
    location: "Amhara Region",
    duration: "1 Day",
    highlights: [
      "View the magnificent waterfalls",
      "Nature walk around the area",
      "Photography opportunities",
      "Local guide included",
    ],
    hotels: [
      { name: "Blue Nile Resort", rating: "⭐⭐⭐⭐", price: "$110/night | ETB 14,300" },
      { name: "Tis Abay Hotel", rating: "⭐⭐⭐", price: "$80/night | ETB 10,400" },
      { name: "Bahir Dar Hotel", rating: "⭐⭐⭐⭐", price: "$100/night | ETB 13,000" },
    ],
  },
  aksum: {
    title: "Aksum Archaeological Site",
    image: axum,
    price: 329,
    description:
      "The ancient capital of the Kingdom of Aksum features monumental granite obelisks and royal tombs.",
    location: "Tigray Region",
    duration: "2 Days / 1 Night",
    highlights: [
      "Visit the obelisks and stelae",
      "Archaeological museum tour",
      "Queen of Sheba's palace",
      "Professional guide included",
    ],
    hotels: [
      { name: "Yeha Hotel", rating: "⭐⭐⭐⭐", price: "$130/night | ETB 16,900" },
      { name: "Aksum Hotel", rating: "⭐⭐⭐", price: "$90/night | ETB 11,700" },
      { name: "Consolar International", rating: "⭐⭐⭐⭐", price: "$110/night | ETB 14,300" },
    ],
  },
  bale: {
    title: "Bale Mountains National Park",
    image: bale,
    price: 479,
    description:
      "A biodiversity hotspot with Afroalpine habitats, home to the endangered Ethiopian wolf and over 270 bird species.",
    location: "Oromia Region",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Wildlife watching",
      "Mountain trekking",
      "Bird watching opportunities",
      "Expert naturalist guide",
    ],
    hotels: [
      { name: "Bale Mountain Lodge", rating: "⭐⭐⭐⭐⭐", price: "$220/night | ETB 28,600" },
      { name: "Goba Wabe Shebelle", rating: "⭐⭐⭐", price: "$100/night | ETB 13,000" },
      { name: "Dinsho Lodge", rating: "⭐⭐⭐", price: "$80/night | ETB 10,400" },
    ],
  },
  lake: {
    title: "Lake Tana Monasteries",
    image: tana,
    price: 279,
    description:
      "Ethiopia's largest lake, dotted with island monasteries that house priceless manuscripts and religious art.",
    location: "Amhara Region",
    duration: "2 Days / 1 Night",
    highlights: [
      "Boat trip to the monasteries",
      "View ancient religious artifacts",
      "Bird watching on the lake",
      "Professional guide included",
    ],
    hotels: [
      { name: "Kuriftu Resort", rating: "⭐⭐⭐⭐⭐", price: "$180/night | ETB 23,400" },
      { name: "Jacaranda Hotel", rating: "⭐⭐⭐⭐", price: "$120/night | ETB 15,600" },
      { name: "Ghion Hotel", rating: "⭐⭐⭐", price: "$90/night | ETB 11,700" },
    ],
  },
  konso: {
    title: "Konso Cultural Landscape",
    image: konso,
    price: 299,
    description:
      "Stone-walled terraces cultivated for over 400 years, a UNESCO site showcasing sustainable farming.",
    location: "Southern Nations",
    duration: "2 Days / 1 Night",
    highlights: [
      "Visit traditional Konso villages",
      "See the ancient terracing systems",
      "Cultural museum visit",
      "Local guide included",
    ],
    hotels: [
      { name: "Konso Lodge", rating: "⭐⭐⭐⭐", price: "$130/night | ETB 16,900" },
      { name: "Kanta Lodge", rating: "⭐⭐⭐", price: "$90/night | ETB 11,700" },
      { name: "Konso Cultural Hotel", rating: "⭐⭐⭐", price: "$70/night | ETB 9,100" },
    ],
  },
  gheralta: {
    title: "Gheralta Rock Churches",
    image: church,
    price: 379,
    description:
      "Cliffside churches from the 13th century, accessible by steep climbs and home to ancient artifacts.",
    location: "Tigray Region",
    duration: "3 Days / 2 Nights",
    highlights: [
      "Visit multiple rock churches",
      "Spectacular mountain views",
      "Ancient religious art",
      "Expert local guide",
    ],
    hotels: [
      { name: "Gheralta Lodge", rating: "⭐⭐⭐⭐⭐", price: "$190/night | ETB 24,700" },
      { name: "Korkor Lodge", rating: "⭐⭐⭐⭐", price: "$140/night | ETB 18,200" },
      { name: "Hawzien Hotel", rating: "⭐⭐⭐", price: "$80/night | ETB 10,400" },
    ],
  },
  coffee: {
    title: "Ethiopian Coffee Culture",
    image: coffee,
    price: 199,
    description:
      "Traditional coffee ceremonies involve roasting, grinding, and brewing coffee—central to Ethiopian hospitality.",
    location: "Nationwide Experience",
    duration: "1 Day",
    highlights: [
      "Participate in coffee ceremony",
      "Learn about coffee production",
      "Taste different coffee varieties",
      "Cultural immersion experience",
    ],
    hotels: [
      { name: "Sheraton Addis", rating: "⭐⭐⭐⭐⭐", price: "$250/night | ETB 32,500" },
      { name: "Hilton Addis", rating: "⭐⭐⭐⭐⭐", price: "$220/night | ETB 28,600" },
      { name: "Radisson Blu", rating: "⭐⭐⭐⭐", price: "$180/night | ETB 23,400" },
    ],
  },
};

// Order used in the original HTML (keeps presentation consistent)
const destOrder = [
  "lalibela",
  "simien",
  "danakil",
  "harar",
  "omo",
  "bluenile",
  "aksum",
  "bale",
  "lake",
  "konso",
  "gheralta",
  "coffee",
];

export default function Gallery({token}) {
  const [navOpen, setNavOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // Modal & booking state
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [packageType, setPackageType] = useState("basic");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const modalOverlayRef = useRef(null);

  // set today as min date for checkin/checkout
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    // scroll listener
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Ensure checkout min >= checkin when checkin changes
    if (checkin && checkout && checkout < checkin) {
      setCheckout(checkin);
    }
  }, [checkin, checkout]);

  useEffect(() => {
    // reset booking inputs whenever modal closes
    if (!isModalOpen) {
      setCheckin("");
      setCheckout("");
      setTravelers(1);
      setPackageType("basic");
      setPaymentMethod("card");
      setCurrentKey(null);
    }
  }, [isModalOpen]);

  // derived destination data
  const currentDestination = currentKey ? destinations[currentKey] : null;

  const totalAmount = useMemo(() => {
    if (!currentDestination) return 0;
    const base = currentDestination.price || 0;
    let multiplier = 1;
    if (packageType === "premium") multiplier = 1.5;
    if (packageType === "luxury") multiplier = 2;
    return base * (parseInt(travelers, 10) || 1) * multiplier;
  }, [currentDestination, travelers, packageType]);

  // open modal for a destination
  const openModal = (key) => {
    setCurrentKey(key);
    setModalOpen(true);
    // ensure payment method default selected
    setPaymentMethod("card");
  };

  // close modal when clicking overlay or pressing ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === modalOverlayRef.current) setModalOpen(false);
  };

  const confirmBooking = () => {
    if (!checkin || !checkout) {
      window.alert("Please select check-in and check-out dates.");
      return;
    }
    if (!paymentMethod) {
      window.alert("Please select a payment method.");
      return;
    }

    const bookingId = "ET" + Math.random().toString(36).substr(2, 9).toUpperCase();
    window.alert(
      `🎉 Booking Confirmed!\n\nThank you for choosing Tourism Ethiopia. Your booking details have been sent to your email. Our team will contact you within 24 hours to finalize your adventure.\n\nBooking ID: ${bookingId}`
    );
    setModalOpen(false);
  };

  return (
    <div className="gallery-page">
    

      <h1 className="page-title">Gallery</h1>

      <div className="gallery-container">
        <div className="gallery-grid">
          {destOrder.map((key) => {
            const d = destinations[key];
            return (
              <article className="gallery-item" key={key} data-destination={key}>
                <img src={d.image} alt={d.title} />
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              {token ?   <button className="book-btn" onClick={() => openModal(key)}>
                  Book Now
                </button> :  <button
        className="book-btn"
        onClick={() => window.location.href='/signin'}
      >
        Sign in to book
      </button>}
              </article>
            );
          })}
        </div>
      </div>

      <footer>&copy; 2025 Tourism Ethiopia. All rights reserved.</footer>

      <button
        id="scrollTopBtn"
        aria-label="Scroll back to top"
        style={{ display: showScroll ? "block" : "none" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      {/* Modal */}
      {isModalOpen && currentDestination && (
        <div
          id="bookingModal"
          className="modal"
          ref={modalOverlayRef}
          onClick={handleOverlayClick}
        >
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <button className="close" aria-label="Close" onClick={() => setModalOpen(false)}>
              &times;
            </button>

            <div className="modal-header">
              <h2 id="modalTitle">Book Your Adventure</h2>
            </div>

            <div className="modal-body">
              <img
                id="destinationImage"
                className="destination-image"
                src={currentDestination.image}
                alt={currentDestination.title}
              />

              <div id="destinationDetails">
                <h3>{currentDestination.title}</h3>
                <p><strong>Location:</strong> {currentDestination.location}</p>
                <p><strong>Duration:</strong> {currentDestination.duration}</p>
                <p><strong>Price:</strong> ${currentDestination.price}/person</p>
                <p>{currentDestination.description}</p>
                <h4>Tour Highlights:</h4>
                <ul>
                  {currentDestination.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>

              <div className="booking-section">
                <h3>Booking Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input type="date" value={checkin} min={today} onChange={(e) => setCheckin(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Check-out Date</label>
                    <input
                      type="date"
                      value={checkout}
                      min={checkin || today}
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Travelers</label>
                    <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5+ People</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tour Package</label>
                    <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                      <option value="basic">Basic Package</option>
                      <option value="premium">Premium Package</option>
                      <option value="luxury">Luxury Package</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="hotels-section">
                <h3>Recommended Hotels</h3>
                <div id="hotelsList">
                  {currentDestination.hotels.map((hotel, idx) => (
                    <div className="hotel-item" key={idx}>
                      <img
                        className="hotel-image"
                        src={
                          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='80' height='60' fill='%23ddd'/><text x='40' y='35' text-anchor='middle' fill='%23666' font-size='10'>Hotel</text></svg>"
                        }
                        alt={hotel.name}
                      />
                      <div className="hotel-info">
                        <div className="hotel-name">{hotel.name}</div>
                        <div className="hotel-rating">{hotel.rating}</div>
                      </div>
                      <div className="hotel-price">{hotel.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="payment-section">
                <h3>Payment Information</h3>
                <div className="payment-methods">
                  <div
                    className={`payment-method ${paymentMethod === "card" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                    data-method="card"
                  >
                    <div className="payment-icon">💳</div>
                    <div>Credit Card</div>
                  </div>

                  <div
                    className={`payment-method ${paymentMethod === "paypal" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("paypal")}
                    data-method="paypal"
                  >
                    <div className="payment-icon">🏦</div>
                    <div>PayPal</div>
                  </div>

                  <div
                    className={`payment-method ${paymentMethod === "bank" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                    data-method="bank"
                  >
                    <div className="payment-icon">🏛️</div>
                    <div>Bank Transfer</div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div id="cardDetails" className="payment-details">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="Full Name on Card" />
                      </div>
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="total-price">
                <div>Total Amount</div>
                <div className="total-amount" id="totalAmount">${totalAmount}</div>
              </div>

              <button className="confirm-booking" onClick={confirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}