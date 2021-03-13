import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import RangeSlider from './component/rangeSlider/RangeSlider'
import Forms from './component/form/Forms';
import Menu from './component/responsiveMenu/Menu';
import SortableComponent from './component/sortable/Sortable'
import Draggable from './component/draggable/Draggable';
import Magnifier from './component/Magnifier/ImageMagifier';
import Magnifier1 from './component/Magnifier/ImageMagifier1';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={RangeSlider} />
                <Route path="/form" exact component={Forms} />
                <Route path="/menu" exact component={Menu} />
                <Route path="/sort" exact component={SortableComponent} />
                <Route path="/drag" exact component={Draggable} />
                <Route path="/magnifier" exact component={Magnifier} />
                <Route path="/magnifier1" exact component={Magnifier1} />
            </Switch>
        )
    }
}

export default Routes;