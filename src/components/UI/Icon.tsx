import { IconType } from "@/types/icon.type";
import Image from "next/image";
import calender from "@/assets/calender.svg";
import clock from "@/assets/clock.svg";
import dotsColumn from "@/assets/dots-column.svg";
import dotsRow from "@/assets/dots-row.svg";
import down from "@/assets/down.svg";
import pencil from "@/assets/pencil.svg";
import plus from "@/assets/plus.svg";
import plusCircle from "@/assets/plus-circle.svg";
import search from "@/assets/search.svg";
import trash from "@/assets/trash.svg";
import undo from "@/assets/undo.svg";
import redo from "@/assets/redo.svg";

interface IconProps {
  type: IconType;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const iconMap: Record<IconType, string> = {
  calender: calender,
  clock: clock,
  "dots-column": dotsColumn,
  "dots-row": dotsRow,
  down: down,
  pencil: pencil,
  plus: plus,
  "plus-circle": plusCircle,
  search: search,
  trash: trash,
  undo: undo,
  redo: redo,
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
