import {Divider} from "antd";


export const DashedDivider = () => {
    return (
        <Divider
            // className={className}
            variant="dashed"
            style={{
                borderColor: "#4DB6AC",
            }}
            dashed
        />
    );
};