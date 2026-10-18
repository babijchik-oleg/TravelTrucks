import Image from "next/image";
import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";
import Icon from "../Icon/Icon";
import Link from "next/link";

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
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={camper.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          style={{ objectFit: "cover" }}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.price}>€{camper.price.toFixed(2)}</div>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.rating}>
            <Icon name="Rating" width={16} height={16} />
            {camper.rating} ({camper.totalReviews || 0} Reviews)
          </div>
          <div className={styles.location}>
            <Icon name="Map" width={16} height={16} />
            {camper.location}
          </div>
        </div>
        <p className={styles.description}>{camper.description}</p>
        <div className={styles.badges}>
          <span className={styles.badge}>
            <Icon name="petrol" width={16} height={16} />
            {camper.engine}
          </span>
          <span className={styles.badge}>
            <Icon name="gearbox" width={16} height={16} />
            {camper.transmission}
          </span>
          <span className={styles.badge}>
            <Icon name="alcove" width={16} height={16} />
            {camper.form}
          </span>
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
}
