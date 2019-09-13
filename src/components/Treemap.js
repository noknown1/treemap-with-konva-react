import React from "react";
import {getData, A, B, C, D, E, F, G} from "../data";
import {Cell} from "../components/Cell";
import {Togglebutton} from "../components/Togglebutton";
import {Layer, Stage} from "react-konva";
import squarify from 'squarify';


// this function is responsible for excluding data depending on what toggle buttons are pressed
function parseData(categories) {

    // get initial data (see data.js)
    let data = getData();

    // iterate through each category, if they are to be filtered then remove that category from the data. This is done
    // by matching the color attributes from the a category to the data received from getData()
    categories.forEach((element) => {
        if (element.filtered) {
            data = data.filter(function (item) {
               return item.color !== element.color;
            });
        }
    });

    return data;

}


export class Treemap extends React.Component {
    constructor(props) {
        super(props);

        // used to repack the treemap squares when the window is resized
        let container = {x0: 0, y0: 0, x1: window.innerWidth, y1: window.innerHeight - 200};

        // the categories array, list of possible categories, their colors, and if they should be filtered out or not
        let categories = [{
                category: "A",
                color: A,
                filtered: false,
            }, {
                category: "B",
                color: B,
                filtered: false,
            }, {
                category: "C",
                color: C,
                filtered: false,
            }, {
                category: "D",
                color: D,
                filtered: false,
            }, {
                category: "E",
                color: E,
                filtered: false,
            }, {
                category: "F",
                color: F,
                filtered: false,
            }, {
                category: "G",
                color: G,
                filtered: false,
            },];

        this.state = {
            container: container,
            categories: categories,
            map: squarify(parseData(categories), container)
        };

        this.updateWindowSize = this.updateWindowSize.bind(this);
        this.renderToggleButton = this.renderToggleButton.bind(this);
        this.handleTogglebuttonMouseClick = this.handleTogglebuttonMouseClick.bind(this);

    }

    // these event listeners are used to resize the treemap depending on the window size
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
                map: squarify(parseData(this.state.categories), container)
            }
        );
    }

    // renders a single Cell, which is simply a square in the treemap
    renderCell(x, y, width, height, squarecolor, text, size, i) {
        return (
            <Cell
                x={x}
                y={y}
                width={width}
                height={height}
                color={squarecolor}
                text={text}
                size={size}
                i={i}
            />
        );
    };

    // renders a single toggle button
    renderToggleButton(x, y, size, color, text, fontsize) {
        return (
            <Togglebutton
                x={x}
                y={y}
                size={size}
                color={color}
                text={text}
                fontsize={fontsize}
                onMouseOver={this.handleTogglebuttonMouseOver}
                onMouseLeave={this.handleTogglebuttonMouseLeave}
                onClick={this.handleTogglebuttonMouseClick}
            />
        );
    };

    // the following functions handle mouse over, leave, and click functionality for the category toggle buttons
    // mouseOver and mouseLeave have been commented out because they sometimes cause visibility issues with the buttons
    handleTogglebuttonMouseOver(e) {
        // graphics
        // e.target.to({
        //     opacity: 0.1,
        // });
    };

    handleTogglebuttonMouseLeave(e) {
        // graphics
        // e.target.to({
        //     opacity: 1.0,
        // });
    };

    handleTogglebuttonMouseClick(e) {
        // graphics
        e.target.to({
            opacity: 0.1,
        });

        // get the category of whatever button was clicked (this is the color of the button)
        let category = e.target.attrs.fill;

        // call update filter to filter out this category from the treemap
        this.updateFilter(category, e);
    };

    // this function updates the category filter list, then calls the parseData function to rebuild the treemap
    updateFilter(category, e) {

        // depending on which category button was clicked, find its spot in the categories list and change
        // the 'filtered' boolean to show if the user wants it filtered out (true) or not (false)
        let categories = this.state.categories;
        categories.forEach((element) => {
            if (element.color === category) {

                // mark the filtered attribute to reflect the toggle button press
                element.filtered = element.filtered === false;

                // depending on the state of the category (toggled or not) update the graphics for the button
                if (element.filtered === false) {
                    e.target.to({
                        opacity: 1.0,
                        strokeWidth: 4,
                        shadowBlur: 5,
                    });
                }
                else {
                    e.target.to({
                        opacity: 0.8,
                        strokeWidth: 10,
                        shadowBlur: 10,
                    });
                }
            }
        });

        // update the treemap by calling the parseData function to rebuild the tree with the new categories list
        // the treemap's state also needs to be updated to reflect the current data being shown
        this.setState(
            {
                container: this.state.container,
                categories: categories,
                map: squarify(parseData(categories), this.state.container)
            }
        );

    }

    render() {

        let cells = [];
        let toggleButtons = [];
        let xPlacement = 120;
        const yPlacement = window.innerHeight - 100;

        // render treemap cells
        this.state.map.forEach((element, index) => {

            // calculate the width and height of the Cell
            let w = element.x1 - element.x0;
            let h = element.y1 - element.y0;

            // calculate the appropriate font size for the Cell based on its size
            let size = w / 5.5;

            // render the Cell
            cells.push(
                this.renderCell(element.x0, element.y0, w, h, element.color, element.name, size, index),
            )
        });

        // render toggle buttons
        this.state.categories.forEach((element) => {
            toggleButtons.push(
                this.renderToggleButton(xPlacement, yPlacement, 40, element.color, element.category, 30),
            );

            // increment distance that buttons will be spaced apart, in this case 120 pixels
            xPlacement += 120;
        });

        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {cells}
                    {toggleButtons}
                </Layer>
            </Stage>
        );

    }

}