import { IconType } from "@/types/icon.type";

import CalenderIcon from "@/assets/calender.svg";
import ClockIcon from "@/assets/clock.svg";
import CheckCircleIcon from "@/assets/check-circle.svg";
import DotsColumnIcon from "@/assets/dots-column.svg";
import DotsRowIcon from "@/assets/dots-row.svg";
import DownIcon from "@/assets/down.svg";
import PencilIcon from "@/assets/pencil.svg";
import PlusIcon from "@/assets/plus.svg";
import PlusCircleIcon from "@/assets/plus-circle.svg";
import SearchIcon from "@/assets/search.svg";
import TrashIcon from "@/assets/trash.svg";
import UndoIcon from "@/assets/undo.svg";
import RedoIcon from "@/assets/redo.svg";

const iconMap: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  calender: CalenderIcon,
  clock: ClockIcon,
  "check-circle": CheckCircleIcon,
  "dots-column": DotsColumnIcon,
  "dots-row": DotsRowIcon,
  down: DownIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  "plus-circle": PlusCircleIcon,
  search: SearchIcon,
  trash: TrashIcon,
  undo: UndoIcon,
  redo: RedoIcon,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  type,
  className = "",
  width = 20,
  height = 20,
  fill = "currentColor",
  ...restProps
}: IconProps) => {
  const IconComponent = iconMap[type];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      width={width}
      height={height}
      fill={fill}
      className={className}
      {...restProps}
    />
  );
};

export default Icon;
