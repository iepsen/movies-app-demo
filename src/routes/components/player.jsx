import React from 'react'
import { PlayerComponent } from '../../presentation/components/player'

export class PlayerRouteComponent extends React.Component {
    render() {
        return (
            <PlayerComponent data={this.props.location.state} />
        )
    }
}