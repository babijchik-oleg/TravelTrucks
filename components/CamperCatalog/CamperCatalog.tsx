import CamperCard from "../CamperCard/CamperCard";
import { Camper } from "@/types/camper";
import styles from "./CamperCatalog.module.css";

interface CamperCatalogProps {
  campers: Camper[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function CamperCatalog({
  campers,
  onLoadMore,
  hasMore,
}: CamperCatalogProps) {
  if (!campers || campers.length === 0) {
    return (
      <div className={styles.emptyState}>
        No campers found matching your request.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className={styles.loadMoreButton}
        >
          Load more
        </button>
      )}
    </div>
  );
}
