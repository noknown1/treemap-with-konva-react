import React from 'react';
import ReactDOM from 'react-dom';
import squarify from 'squarify';
import { Stage, Layer, Rect, Text} from 'react-konva';
import './index.css';

// Parse data for treemap
// = // ======================================================================================================== // = //

const data = [{
    name: 'Azura', value: 6, color: 'red',
}, {
    name: 'Seth', value: 5, color: '',
    children: [
        {
            name: 'Noam', value: 3, color: 'orange',
        },
        {
            name: 'Enos', value: 2, color: 'yellow',
        },
    ]
}, {
    name: 'Awan', value: 5, color: '',
    children: [{
        name: 'Enoch', value: 5, color: 'green',
    }]
}, {
    name: 'Abel', value: 4, color: 'blue',
}, {
    name: 'Cain', value: 1, color: 'purple',
}];

// TODO: DYNAMICALLY GET AND UPDATE THE WINDOW WIDTH AND HEIGHT TO SIZE THE TREEMAP
const container = {x0: 0, y0: 0, x1: 1200, y1: 800};
const output = squarify(data, container);

// React components
// = // ======================================================================================================== // = //

function Square(props) {
    return (
        <Rect
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fill={props.color}
            stroke="black"
            strokeWidth={3}
            onMouseOver={TreeMap.handleMouseOver}
            onMouseLeave={TreeMap.handleMouseLeave}
        />
    );
}

function Label(props) {
    return (
        <Text
            x={props.x}
            y={props.y}
            text={props.text}
            fontSize={props.size}
            fontFamily={'Calibri'}
            fill={'black'}
        />
    );
}

class TreeMap extends React.Component {

    // Handles mouse-over events for a square
    static handleMouseOver = e => {
        e.target.to({
            opacity: 0.5,
        });
    };

    // Handles mouse-leave events for a square
    static handleMouseLeave = e => {
        e.target.to({
            opacity: 1.0,
        });
    };

    // Renders a rectangle on screen
    renderSquare(x, y, width, height, color, i) {
        return (
            <Square
                x={x}
                y={y}
                width={width}
                height={height}
                color={color}
                i={i}
            />
        );
    }

    // Renders text on screen
    renderLabel(x, y, text, size) {
        return (
            <Label
                x={x}
                y={y}
                text={text}
                size={size}
            />
        );
    }

    render() {
        let squares = [];

        output.forEach((element, index) => {

            // Calculate the width and height of the square
            var w = element.x1 - element.x0;
            var h = element.y1 - element.y0;

            // Calculate location offsets and font size for text labels
            var title_font_size = w / 5;
            var title_coordinates = [element.x0 + 10, element.y0 + 10];

            // Render the square and it's title text
            squares.push(
                this.renderSquare(element.x0, element.y0, w, h, element.color, index),
                this.renderLabel(...title_coordinates, element.name, title_font_size),
            )
        });

        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {squares}
                </Layer>
            </Stage>
        );
    }
}

// Launch react DOM
// = // ======================================================================================================== // = //

ReactDOM.render(
    <TreeMap />,
    document.getElementById('root')
);