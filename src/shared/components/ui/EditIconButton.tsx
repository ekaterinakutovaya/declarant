import { Button, Tooltip  } from "antd"
import { SquarePen } from "lucide-react"
import type {FC, MouseEventHandler, ReactNode} from "react";

interface EditIconButtonProps {
	onClick?: MouseEventHandler<HTMLElement>;
	icon?: ReactNode;
	tooltip?: ReactNode;
}

export const EditIconButton: FC<EditIconButtonProps> = ({ onClick, icon = <SquarePen className="w-4 h-4 align-middle"/>, tooltip = "Редактировать" }) => {
	return (
		<Tooltip title={tooltip} placement="bottom">
			<Button onClick={onClick} type="text" className="!text-primary flex items-center justify-center" icon={icon}></Button>
		</Tooltip>
	)
}