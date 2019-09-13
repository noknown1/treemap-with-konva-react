import React from "react";
import {Circle, Text, Group} from "react-konva";

// a single toggle button, used to filter out a specific category of data from the treemap
export function Togglebutton(props) {

    return(
        <Group>
            <Circle
                x={props.x}
                y={props.y}
                radius={props.size}
                fill={props.color}
                stroke={"#393939"}
                strokeWidth={4}
                shadowColor={"#393939"}
                shadowOffsetX={0}
                shadowOffsetY={0}
                shadowBlur={5}
                onMouseOver={(e) => props.onMouseOver(e)}
                onMouseLeave={(e) => props.onMouseLeave(e)}
                onClick={(e) => props.onClick(e)}
                // draggable={true} : when enabled allows for draggable buttons
            />
            <Text
                x={props.x - 8}
                y={props.y - 13}
                text={props.text}
                fontSize={props.fontsize}
                fontFamily={'Calibri'}
                fill={'black'}
                listening={false}
                // visible={false} : enable to hide text
            />
        </Group>
    );
}