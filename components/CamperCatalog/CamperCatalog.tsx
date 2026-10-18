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
    return <div>No campers found matching your request.</div>;
  }

  return (
    <div className={styles.listContainer}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasMore && (
        <button onClick={onLoadMore} className={styles.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
