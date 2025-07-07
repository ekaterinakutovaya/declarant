import { Button, Popconfirm, type PopconfirmProps, Tooltip } from "antd";
import { Trash2 } from "lucide-react";
import type { FC, ReactNode } from "react";

interface DeleteIconButtonProps {
  onConfirm?: PopconfirmProps["onConfirm"];
  icon?: ReactNode;
  tooltip?: ReactNode;
  popconfirmProps?: Partial<PopconfirmProps>;
}

export const DeleteIconButton: FC<DeleteIconButtonProps> = ({
  onConfirm,
  popconfirmProps,
  icon = <Trash2 className="w-4 h-4 align-middle mb-[1.5px]" />,
}) => {
  return (
    <Popconfirm
      title="Удалить запись?"
      onConfirm={onConfirm}
      okText="Удалить"
      cancelText="Отмена"
	  {...popconfirmProps}
    >
      <Tooltip title="Удалить" placement="bottom">
        <Button
          type="text"
          className="!text-red-500 flex items-center justify-center"
          icon={icon}
        ></Button>
      </Tooltip>
    </Popconfirm>
  );
};
