import React from "react";
import { Rect, Text, Group} from "react-konva";
import { Treemap } from "../components/Treemap";

// a single square of the treemap, created from a rectangle and text item from konva-react
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
                onMouseOver={Treemap.handleCellMouseOver}
                onMouseLeave={Treemap.handleCellMouseLeave}
                onClick={Treemap.handleCellMouseClick}
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