import Image from "next/image";
import Link from "next/link";
import { Camper } from "@/types/camper";
import { formatLabel, formatPrice } from "@/lib/format";
import Icon from "../Icon/Icon";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const imageUrl =
    camper.coverImage ||
    (camper.gallery && camper.gallery.length > 0
      ? camper.gallery[0].thumb
      : "/default-image.jpg");

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={camper.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 180px, 219px"
          style={{ objectFit: "cover" }}
          className={styles.imageContainer}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <p className={styles.price}>{formatPrice(camper.price)}</p>
        </div>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <Icon name="Rating" width={16} height={16} />
            {camper.rating} ({camper.totalReviews || 0} Reviews)
          </span>
          <span className={styles.badge}>
            <Icon name="Map" width={16} height={16} />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.badgesList}>
          <li className={styles.badge}>
            <Icon name="petrol" width={16} height={16} />
            {formatLabel(camper.engine)}
          </li>
          <li className={styles.badge}>
            <Icon name="gearbox" width={16} height={16} />
            {formatLabel(camper.transmission)}
          </li>
          <li className={styles.badge}>
            <Icon name="alcove" width={16} height={16} />
            {formatLabel(camper.form)}
          </li>
        </ul>

        <Link href={`/catalog/${camper.id}`} className={styles.link}>
          Show more
        </Link>
      </div>
    </article>
  );
}
