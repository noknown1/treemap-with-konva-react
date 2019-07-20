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
        {
            name: 'Terg', value: 2, color: 'orange',
        },
        {
            name: 'Sharron', value: 2, color: 'yellow',
        },
    ]
}, {
    name: 'Awan', value: 5, color: '',
    children: [
        {
        name: 'Enoch', value: 5, color: 'green',
        },
        {
            name: 'Briggs', value: 3, color: 'green',
        },
    ]
}, {
    name: 'Abel', value: 4, color: 'blue',
}, {
    name: 'Cain', value: 1, color: 'purple',
}];

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
            onClick={TreeMap.handleMouseClick}
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

    constructor(props) {
        super(props);
        let container = {x0: 0, y0: 0, x1: window.innerWidth, y1: window.innerHeight - 200};
        this.state = {
            container: container,
            output: squarify(data, container)
        };
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    componentDidMount() {
        this.updateWindowSize();
        window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    }

    updateWindowSize() {
        let container = {x0: 0, y0: 0, x1: window.innerWidth, y1: window.innerHeight - 200};
        this.setState(
            {
                container: container,
                output: squarify(data, container)
                }
            );
    }

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

    // Handles mouse-click events for a square
    static handleMouseClick = e => {
        e.target.to({
            opacity: 0.1,
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

        this.state.output.forEach((element, index) => {

            // Calculate the width and height of the square
            let w = element.x1 - element.x0;
            let h = element.y1 - element.y0;

            // Calculate location offsets and font size for text labels
            let title_font_size = w / 5;
            let title_coordinates = [element.x0 + 10, element.y0 + 10];

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