interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  width = 20,
  height = 20,
  className,
}: IconProps) {
  const spriteId = name.startsWith("icon-") ? name : `icon-${name}`;
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/icons/symbol-defs.svg#${spriteId}`} />
    </svg>
  );
}
