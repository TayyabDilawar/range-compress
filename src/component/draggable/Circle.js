import React from 'react';
import ReactDOM from 'react-dom';

// import Circle1 from './Circle1'

class Circle extends React.Component {

    componentDidMount() {
        const handleDrag = d3.drag()
            .subject(function () {
                const me = d3.select(this);
                return { x: me.attr('cx'), y: me.attr('cy') }
            })
            .on('drag', function () {
                const me = d3.select(this);
                me.attr('cx', d3.event.x);
                me.attr('cy', d3.event.y);
            });
        const node = ReactDOM.findDOMNode(this);
        handleDrag(d3.select(node));
    }

    render() {
        return <circle {...this.props} />
    }
}

export default Circle;