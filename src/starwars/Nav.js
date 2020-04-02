import React, { Component } from 'react'
import {
    NavLink
} from 'react-router-dom'

export default class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vehicles: []
        }
    }

    componentDidMount() {
        // Fetch list of vehicles from SWAPI.co
        const savedVehicles = localStorage.getItem('vehicles1')

        if(savedVehicles){
            this.setState({
                vehicles: JSON.parse(savedVehicles)
            })
            return
        }

        fetch(`https://swapi.co/api/vehicles/`)
            .then(response => response.json())
            .then(json => {
                this.setState({ vehicles: json.results })
                localStorage.setItem('vehicles1', JSON.stringify(json.results))
            })
    }

    render() {
        return (
            <ul>
                {/* <li><a href="/vehicle/4">Sand Crawler</a></li>
        <li><a href="/vehicle/6">T-16 Skyhopper</a></li> */}
                {this.state.vehicles.map((vehicle, index) => {
                    // vehicle.url : "https://swapi.co/api/vehicles/4/"
                    const id = vehicle.url.split('/')[5]
                    return (
                        <li key={index}>
                            <NavLink
                                activeStyle={{ fontWeight: 'bold' }}
                                to={`/vehicle/${id}`}>
                                {vehicle.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        )
    }
}