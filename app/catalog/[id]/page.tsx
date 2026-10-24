"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Camper, ReviewEntity } from "@/types/camper";
import { formatLabel, formatPrice } from "@/lib/format";
import Icon from "@/components/Icon/Icon";

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
      <main className="page-container flex flex-1 flex-col py-6 md:py-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface px-6 py-12 text-center md:py-16">
          <span className="h-10 w-10 animate-spinner rounded-full border-4 border-muted-light border-t-accent" />
          <p className="text-sm text-secondary md:text-base">
            Loading details...
          </p>
        </div>
      </main>
    );
  }

  if (!camper) {
    return (
      <main className="page-container flex flex-1 flex-col py-6 md:py-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface px-6 py-12 text-center md:py-16">
          <h2 className="text-xl font-semibold text-main md:text-2xl">
            Camper not found
          </h2>
          <p className="text-sm text-secondary md:text-base">
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
    <main className="page-container flex w-full flex-1 flex-col py-6 md:py-10 xl:py-12">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_600px] xl:gap-12">
        {/* Gallery */}
        <div className="flex w-full flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface lg:aspect-[638/490]">
            <Image
              src={mainImage}
              alt={camper.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 55vw, 638px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex snap-x gap-3 overflow-x-auto pb-2">
              {gallery.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-current={selectedImageIndex === index ? "true" : "false"}
                  className={`relative h-20 w-24 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-transform hover:-translate-y-0.5 md:h-28 md:w-32 xl:h-[150px] xl:w-[150px] ${
                    selectedImageIndex === index
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.thumb || img.original}
                    alt={`${camper.name} photo ${index + 1}`}
                    fill
                    sizes="(max-width: 767px) 96px, (max-width: 1279px) 128px, 150px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main information */}
        <div className="flex w-full flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="text-2xl font-semibold leading-tight text-main md:text-3xl xl:text-4xl">
              {camper.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-main md:text-base">
              <span className="flex items-center gap-2">
                <Icon name="Rating" width={16} height={16} />
                {camper.rating} ({camper.totalReviews || camperReviews.length}{" "}
                Reviews)
              </span>
              <span className="flex items-center gap-2">
                <Icon name="Map" width={16} height={16} />
                {camper.location}
              </span>
            </div>

            <p className="text-2xl font-semibold text-main md:text-3xl">
              {formatPrice(camper.price)}
            </p>

            <p className="text-sm leading-[1.5] text-secondary md:text-base">
              {camper.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-main md:text-xl">
              Vehicle details
            </h2>

            <div className="flex flex-wrap gap-2">
              {camper.transmission && (
                <span className="flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-medium text-main sm:px-4 sm:py-2.5 sm:text-sm xl:text-base">
                  <Icon name="gearbox" width={16} height={16} />
                  {formatLabel(camper.transmission)}
                </span>
              )}
              {camper.engine && (
                <span className="flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-medium text-main sm:px-4 sm:py-2.5 sm:text-sm xl:text-base">
                  <Icon name="petrol" width={16} height={16} />
                  {formatLabel(camper.engine)}
                </span>
              )}
              {camper.form && (
                <span className="flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-medium text-main sm:px-4 sm:py-2.5 sm:text-sm xl:text-base">
                  <Icon name="alcove" width={16} height={16} />
                  {formatLabel(camper.form)}
                </span>
              )}
            </div>

            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                { label: "Form", value: formatLabel(camper.form) },
                { label: "Length", value: camper.length },
                { label: "Width", value: camper.width },
                { label: "Height", value: camper.height },
                { label: "Tank", value: camper.tank },
                { label: "Consumption", value: camper.consumption },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-muted-light pb-2 text-xs sm:text-sm"
                >
                  <span className="text-muted">{item.label}</span>
                  <span className="font-medium text-main">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews and booking form */}
      <div className="mt-10 grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-8 xl:mt-12 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-12">
        <div className="flex w-full flex-col gap-6">
          <h2 className="text-xl font-semibold text-main md:text-2xl">
            Reviews
          </h2>

          <div className="flex flex-col gap-4 md:gap-6">
            {camperReviews.length > 0 ? (
              camperReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-muted-light bg-white p-4 md:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white md:h-11 md:w-11 md:text-base">
                      {review.reviewer_name
                        ? review.reviewer_name.charAt(0).toUpperCase()
                        : "A"}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-medium text-main md:text-base">
                        {review.reviewer_name}
                      </h3>

                      <div className="flex items-center gap-0.5">
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

                  <p className="mt-3 text-sm leading-[1.5] text-secondary md:mt-4 md:text-base">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-surface p-6 text-sm text-secondary md:text-base">
                No reviews available for this camper.
              </p>
            )}
          </div>
        </div>

        {/* Booking form */}
        <div className="w-full rounded-2xl bg-badge p-4 md:p-6">
          <h2 className="text-lg font-semibold text-main md:text-xl">
            Book your campervan now
          </h2>
          <p className="mt-1 text-xs text-secondary md:text-sm">
            Stay connected! We are always ready to help you.
          </p>

          {submitted ? (
            <p className="mt-6 rounded-xl bg-white p-4 text-sm text-main md:text-base">
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
              className="mt-6 flex flex-col gap-4"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <div
                  className={`flex items-center rounded-xl border bg-white px-4 transition-colors ${
                    nameIsInvalid
                      ? "border-error bg-error-bg"
                      : "border-transparent focus-within:border-accent"
                  }`}
                >
                  <label htmlFor="booking-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    className="h-14 w-full bg-transparent text-base text-main outline-none placeholder:text-muted"
                    placeholder="Your name"
                  />
                  {nameIsInvalid && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
                      !
                    </span>
                  )}
                </div>
                {nameIsInvalid && (
                  <span className="text-xs text-error md:text-sm">
                    Please enter your name (at least 3 characters).
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className={`flex items-center rounded-xl border bg-white px-4 transition-colors ${
                    emailIsInvalid
                      ? "border-error bg-error-bg"
                      : "border-transparent focus-within:border-accent"
                  }`}
                >
                  <label htmlFor="booking-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    className="h-14 w-full bg-transparent text-base text-main outline-none placeholder:text-muted"
                    placeholder="your@email.com"
                  />
                  {emailIsInvalid && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
                      !
                    </span>
                  )}
                </div>
                {emailIsInvalid && (
                  <span className="text-xs text-error md:text-sm">
                    Please enter a valid email address.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 h-12 w-full rounded-[200px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-hover md:h-14 md:text-base"
              >
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
        <main className="page-container flex flex-1 flex-col py-6 md:py-10">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface px-6 py-12 text-center md:py-16">
            <span className="h-10 w-10 animate-spinner rounded-full border-4 border-muted-light border-t-accent" />
            <p className="text-sm text-secondary md:text-base">
              Loading details...
            </p>
          </div>
        </main>
      }
    >
      <CamperDetailsContent />
    </Suspense>
  );
}
