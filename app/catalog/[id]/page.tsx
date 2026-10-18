"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Camper, ReviewEntity } from "@/types/camper";
import Icon from "@/components/Icon/Icon";
import styles from "./CamperDetails.module.css";

const BASE_URL = "https://campers-api.goit.study";

function CamperDetailsContent() {
  const params = useParams();
  const id = params?.id;
  const [camper, setCamper] = useState<Camper | null>(null);
  const [reviews, setReviews] = useState<ReviewEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchCamperDetails() {
      try {
        setLoading(true);

        const resCamper = await fetch(`${BASE_URL}/campers/${id}`);
        if (!resCamper.ok) throw new Error("Failed to fetch camper details");
        const camperData = await resCamper.json();
        setCamper(camperData);

        const resReviews = await fetch(`${BASE_URL}/campers/${id}/reviews`);
        if (resReviews.ok) {
          const reviewsData = await resReviews.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error("Error loading camper details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCamperDetails();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (!camper) return <p>Camper not found.</p>;

  const gallery = camper.gallery || [];
  const mainImage =
    gallery[selectedImageIndex]?.original ||
    gallery[selectedImageIndex]?.thumb ||
    "/default-image.jpg";
  const camperReviews = reviews;

  return (
    <main className={styles.container}>
      <div className={styles.detailsLayout}>
        <div className={styles.galleryColumn}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={mainImage}
              alt={camper.name}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 638px"
              style={{ objectFit: "cover" }}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.thumbnailsGrid}>
            {gallery.slice(0, 4).map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`${styles.thumbnailWrapper} ${
                  selectedImageIndex === index ? styles.activeThumbnail : ""
                }`}
              >
                <Image
                  src={img.thumb || img.original}
                  alt={`${camper.name} photo ${index + 1}`}
                  fill
                  sizes="136px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.mainCard}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Icon name="Rating" width={16} height={16} />
                {camper.rating} ({camper.totalReviews || camperReviews.length}
                Reviews)
              </span>
              <span className={styles.metaItem}>
                <Icon name="Map" width={16} height={16} />
                {camper.location}
              </span>
            </div>
            <h2 className={styles.price}>€{camper.price.toFixed(2)}</h2>
            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={styles.featuresSection}>
            <h3 className={styles.sectionTitle}>Vehicle details</h3>

            <div className={styles.featuresBadges}>
              {camper.transmission && (
                <span className={styles.badge}>
                  <Icon name="gearbox" width={16} height={16} />
                  {camper.transmission}
                </span>
              )}
              {camper.engine && (
                <span className={styles.badge}>
                  <Icon name="petrol" width={16} height={16} />
                  {camper.engine}
                </span>
              )}
              {camper.form && (
                <span className={styles.badge}>
                  <Icon name="alcove" width={16} height={16} />
                  {camper.form}
                </span>
              )}
            </div>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span>Form</span>
                <span>{camper.form}</span>
              </li>
              <li className={styles.featureItem}>
                <span>Length</span>
                <span>{camper.length}</span>
              </li>
              <li className={styles.featureItem}>
                <span>Width</span>
                <span>{camper.width}</span>
              </li>
              <li className={styles.featureItem}>
                <span>Height</span>
                <span>{camper.height}</span>
              </li>
              <li className={styles.featureItem}>
                <span>Tank</span>
                <span>{camper.tank}</span>
              </li>
              <li className={styles.featureItem}>
                <span>Consumption</span>
                <span>{camper.consumption}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижній блок: Вкладки (Features/Reviews) та Форма бронювання */}
      <div className={styles.reviewsAndBooking}>
        <div className={styles.leftColumn}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>

          <div className={styles.reviewsContainer}>
            {camperReviews.length > 0 ? (
              camperReviews.map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {review.reviewer_name
                        ? review.reviewer_name.charAt(0).toUpperCase()
                        : "A"}
                    </div>

                    <div className={styles.reviewerInfo}>
                      <h4 className={styles.reviewerName}>
                        {review.reviewer_name}
                      </h4>

                      <div className={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name={
                              star <= review.reviewer_rating
                                ? "Rating"
                                : "Rating-2"
                            }
                            width={16}
                            height={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews available for this camper.</p>
            )}
          </div>
        </div>

        {/* Форма бронювання */}
        <div className={styles.bookingFormWrapper}>
          <h3>Book your campervan now</h3>
          <p className={styles.bookingSubtitle}>
            Stay connected! We are always ready to help you.
          </p>

          {submitted ? (
            <p className={styles.successMessage}>
              Thank you! Your booking request has been sent.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const isNameValid = bookingData.name.trim().length >= 3;
                const isEmailValid = bookingData.email.includes("@");

                if (!isNameValid || !isEmailValid) {
                  setHasError(true);
                  return;
                }
                setHasError(false);
                setSubmitted(true);
              }}
              className={styles.form}
              noValidate
            >
              {/* Поле імені */}
              <div className={styles.inputFieldContainer}>
                <div
                  className={`${styles.inputWrapper} ${
                    hasError && bookingData.name.trim().length < 3
                      ? styles.errorWrapper
                      : ""
                  }`}
                >
                  <label className={styles.label}>Name*</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    className={styles.input}
                  />
                  {hasError && bookingData.name.trim().length < 3 && (
                    <span className={styles.errorIcon}>!</span>
                  )}
                </div>
                {hasError && bookingData.name.trim().length < 3 && (
                  <span className={styles.errorText}>
                    Please enter your name.
                  </span>
                )}
              </div>

              {/* Поле Email */}
              <div className={styles.inputFieldContainer}>
                <div
                  className={`${styles.inputWrapper} ${
                    hasError && !bookingData.email.includes("@")
                      ? styles.errorWrapper
                      : ""
                  }`}
                >
                  <label className={styles.label}>Email*</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    className={styles.input}
                  />
                  {hasError && !bookingData.email.includes("@") && (
                    <span className={styles.errorIcon}>!</span>
                  )}
                </div>
                {hasError && !bookingData.email.includes("@") && (
                  <span className={styles.errorText}>
                    Please enter your email.
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
export default function CamperDetailsPage() {
  return (
    <Suspense fallback={<p>Loading details...</p>}>
      {" "}
      <CamperDetailsContent />{" "}
    </Suspense>
  );
}
