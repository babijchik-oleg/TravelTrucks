"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Camper, ReviewEntity } from "@/types/camper";
import { formatLabel, formatPrice } from "@/lib/format";
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

  if (loading) {
    return (
      <main className={styles.pageContainer}>
        <div className={styles.loadingInner}>
          <span className={styles.spinner} />
          <p className={styles.loadingText}>Loading details...</p>
        </div>
      </main>
    );
  }

  if (!camper) {
    return (
      <main className={styles.pageContainer}>
        <div className={styles.errorInner}>
          <h2 className={styles.errorTitle}>Camper not found</h2>
          <p className={styles.errorText}>
            The camper you are looking for does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  const gallery = camper.gallery || [];
  const mainImage =
    gallery[selectedImageIndex]?.original ||
    gallery[selectedImageIndex]?.thumb ||
    "/default-image.jpg";
  const camperReviews = reviews;
  const nameIsInvalid = hasError && bookingData.name.trim().length < 3;
  const emailIsInvalid = hasError && !bookingData.email.includes("@");

  return (
    <main className={styles.pageContainer}>
      <div className={styles.mainGrid}>
        {/* Gallery */}
        <div className={styles.gallerySection}>
          <div className={styles.mainImageContainer}>
            <Image
              src={mainImage}
              alt={camper.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 55vw, 638px"
              style={{ objectFit: "cover" }}
              className={styles.mainImage}
            />
          </div>

          {gallery.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {gallery.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-current={selectedImageIndex === index ? "true" : "false"}
                  className={`${styles.thumbnailButton} ${selectedImageIndex === index ? styles.thumbnailButtonActive : styles.thumbnailButtonInactive}`}
                >
                  <Image
                    src={img.thumb || img.original}
                    alt={`${camper.name} photo ${index + 1}`}
                    fill
                    sizes="(max-width: 767px) 96px, (max-width: 1279px) 128px, 150px"
                    style={{ objectFit: "cover" }}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main information */}
        <div className={styles.infoSection}>
          <div className={styles.headerSection}>
            <h1 className={styles.camperName}>{camper.name}</h1>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Icon name="Rating" width={16} height={16} />
                {camper.rating} ({camper.totalReviews || camperReviews.length}{" "}
                Reviews)
              </span>
              <span className={styles.metaItem}>
                <Icon name="Map" width={16} height={16} />
                {camper.location}
              </span>
            </div>

            <p className={styles.price}>{formatPrice(camper.price)}</p>

            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={styles.detailsSection}>
            <h2 className={styles.detailsTitle}>Vehicle details</h2>

            <div className={styles.badgesContainer}>
              {camper.transmission && (
                <span className={styles.badge}>
                  <Icon name="gearbox" width={16} height={16} />
                  {formatLabel(camper.transmission)}
                </span>
              )}
              {camper.engine && (
                <span className={styles.badge}>
                  <Icon name="petrol" width={16} height={16} />
                  {formatLabel(camper.engine)}
                </span>
              )}
              {camper.form && (
                <span className={styles.badge}>
                  <Icon name="alcove" width={16} height={16} />
                  {formatLabel(camper.form)}
                </span>
              )}
            </div>

            <ul className={styles.specsList}>
              {[
                { label: "Form", value: formatLabel(camper.form) },
                { label: "Length", value: camper.length },
                { label: "Width", value: camper.width },
                { label: "Height", value: camper.height },
                { label: "Tank", value: camper.tank },
                { label: "Consumption", value: camper.consumption },
              ].map((item) => (
                <li key={item.label} className={styles.specItem}>
                  <span className={styles.specLabel}>{item.label}</span>
                  <span className={styles.specValue}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews and booking form */}

      <h2 className={styles.reviewsTitle}>Reviews</h2>
      <div className={styles.reviewsBookingGrid}>
        <div className={styles.reviewsSection}>
          <div className={styles.reviewsListContainer}>
            {camperReviews.length > 0 ? (
              camperReviews.map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>
                      {review.reviewer_name
                        ? review.reviewer_name.charAt(0).toUpperCase()
                        : "A"}
                    </div>

                    <div className={styles.reviewInfo}>
                      <h3 className={styles.reviewerName}>
                        {review.reviewer_name}
                      </h3>

                      <div className={styles.reviewStars}>
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
              <p className={styles.noReviews}>
                No reviews available for this camper.
              </p>
            )}
          </div>
        </div>

        {/* Booking form */}
        <div className={styles.bookingSection}>
          <h2 className={styles.bookingTitle}>Book your campervan now</h2>
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
              <div className={styles.formField}>
                <div
                  className={`${styles.inputWrapper} ${nameIsInvalid ? styles.inputWrapperError : ""}`}
                >
                  <label htmlFor="booking-name" className={styles.inputLabel}>
                    Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    className={styles.input}
                    placeholder="Your name"
                  />
                  {nameIsInvalid && <span className={styles.errorIcon}>!</span>}
                </div>
                {nameIsInvalid && (
                  <span className={styles.formErrorText}>
                    Please enter your name (at least 3 characters).
                  </span>
                )}
              </div>

              <div className={styles.formField}>
                <div
                  className={`${styles.inputWrapper} ${emailIsInvalid ? styles.inputWrapperError : ""}`}
                >
                  <label htmlFor="booking-email" className={styles.inputLabel}>
                    Email
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    className={styles.input}
                    placeholder="your@email.com"
                  />
                  {emailIsInvalid && (
                    <span className={styles.errorIcon}>!</span>
                  )}
                </div>
                {emailIsInvalid && (
                  <span className={styles.formErrorText}>
                    Please enter a valid email address.
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submitButton}>
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
    <Suspense
      fallback={
        <main className={styles.pageContainer}>
          <div className={styles.suspenseInner}>
            <span className={styles.spinner} />
            <p className={styles.loadingText}>Loading details...</p>
          </div>
        </main>
      }
    >
      <CamperDetailsContent />
    </Suspense>
  );
}
