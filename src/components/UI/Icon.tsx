import { IconType } from "@/types/icon.type";
import Image from "next/image";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import calender from "@/assets/calender.svg";
import dotsColumn from "@/assets/dots-column.svg";
import dotsRow from "@/assets/dots-row.svg";
import down from "@/assets/down.svg";
import pencil from "@/assets/pencil.svg";
import search from "@/assets/search.svg";
import trash from "@/assets/trash.svg";

interface IconProps {
  type: IconType;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const iconMap: Record<IconType, unknown> = {
  "arrow-left": arrowLeft,
  "arrow-right": arrowRight,
  calender: calender,
  "dots-column": dotsColumn,
  "dots-row": dotsRow,
  down: down,
  pencil: pencil,
  search: search,
  trash: trash,
};

const Icon: React.FC<IconProps> = ({
  type,
  alt = "",
  className = "",
  width = 24,
  height = 24,
  ...restProps
}) => {
  const src = iconMap[type];

  if (typeof src !== "string") {
    throw new Error("존재하지 않는 아이콘입니다.");
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      {...restProps}
    />
  );
};

export default Icon;
