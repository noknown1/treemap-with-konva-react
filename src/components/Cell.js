import React from "react";
import { Rect, Text, Group} from "react-konva";

// a single square of the treemap
export function Cell(props) {
    return(
        <Group>
            <Rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill={props.color}
                stroke="black"
                strokeWidth={3}
                onMouseOver={props.onMouseOver}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
            />
            <Text
                x={props.x + 10}
                y={props.y + 10}
                text={props.text}
                fontSize={props.size}
                fontFamily={'Calibri'}
                fill={'black'}
            />
        </Group>
    );
}
