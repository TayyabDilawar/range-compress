import React, { Component } from 'react';

import Sortable, { MultiDrag } from "sortablejs";

import './sortable.css';

class SortableComponent extends Component {

    state = {
        listValue: [
            { id: 1, value: "Item 1" },
            { id: 2, value: "Item 2" },
            { id: 3, value: "Item 3" },
            { id: 4, value: "Item 4" },
            { id: 5, value: "Item 5" },
            { id: 6, value: "Item 6" },
            { id: 7, value: "Item 7" },
            { id: 8, value: "Item 8" },
            { id: 9, value: "Item 9" },
            { id: 10, value: "Item 10" },
            { id: 11, value: "Item 11" },
            { id: 12, value: "Item 12" },
            { id: 13, value: "Item 13" },
            { id: 14, value: "Item 14" },
            { id: 15, value: "Item 15" },
            { id: 16, value: "Item 16" },
            { id: 17, value: "Item 17" },
            { id: 18, value: "Item 18" },
            { id: 19, value: "Item 19" },
            { id: 20, value: "Item 20" },
        ],
        width: "",
        height: "",
        width1: "40px",
        height1: "40px",
        menu: null,
        box: null,
        currentOpenBoxId: -1
    }

    componentDidMount() {
        Sortable.mount(new MultiDrag());

        var el = document.getElementById('items');
        Sortable.create(el, {
            swap: true,
            swapClass: "highlight",
            animation: 150
        });

        window.onclick = () => {
            this.hideContextMenu()
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        this.setState({
            width1: this.state.width + "px",
            height1: this.state.height + "px",
            width: "",
            height: ""
        })
    }

    addItemBox = () => {
        let list = this.state.listValue
        const lastItem = list[list.length - 1]
        let newIdValue = lastItem.id + 1
        list.push({
            id: newIdValue,
            value: `Item ${newIdValue}`
        })
        this.setState({
            listValue: list
        })
    }

    deleteSpecificItem = () => {
        const id = this.state.currentOpenBoxId;

        const items = this.state.listValue
        const updListValues = items.filter(item => item.id !== id);

        this.setState({
            listValue: updListValues
        })
    }

    rightClickMenu = () => {
        // console.log("hello to all")
        return (
            <div id="contextMenu" className="context_menu">
                <ul className="menu">
                    <li className="menu-item">Cut</li>
                    <li className="menu-item">Copy</li>
                    <li className="menu-item">Paste</li>
                    <li className="menu-item" onClick={this.deleteSpecificItem}>Delete</li>
                    <li className="menu-item" onClick={this.addItemBox}>Add</li>
                </ul>
            </div>
        )
    }

    handleRightClick = (event, id) => {
        // this.rightClickMenu()
        console.log("Hello again and again", id)
        this.setState({
            currentOpenBoxId: id
        })
        let contextMenu = document.getElementById("contextMenu");
        // console.log(contextMenu, event.clientX)
        event.preventDefault()
        contextMenu.style.display = 'block';
        // console.log("Type of", event.clientX)
        contextMenu.style.left = (event.clientX - 10) + 'px';
        contextMenu.style.top = (event.clientY - 53) + 'px';
    }

    hideContextMenu = () => {
        let contextMenu = document.getElementById("contextMenu");
        contextMenu.style.display = 'none';
        this.setState({
            currentOpenBoxId: -1
        })
    }

    render() {
        return (
            <div>
                <div>
                    Width: <input type="number" value={this.state.width} name="width" onChange={(e) => this.handleChange(e)} />
                    height: <input type="number" value={this.state.height} name="height" onChange={this.handleChange} />
                    <button onClick={(e) => this.onSubmit(e)}>Apply</button><br />
                    <button onClick={this.addItemBox}>Add Item Box</button>
                </div>
                <div id="items">
                    {this.state.listValue.map((listItem, index) => (
                        <div key={index} onContextMenu={(ev) => this.handleRightClick(ev, listItem.id)} id={listItem.id} className="sortBox" style={{ width: this.state.width1, height: this.state.height1 }}>
                            {listItem.value}
                            {this.rightClickMenu()}
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SortableComponent;