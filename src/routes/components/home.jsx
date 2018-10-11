import React from 'react'
import { VideosInteractor } from '../../domain/videos-interactor'
import { VideoListComponent } from '../../presentation/components/video-list'
import css from '../styles/home.scss'

export class HomeRouteComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            entities: null
        }
    }

    componentWillMount() {
        new VideosInteractor().get()
            .then(entities => 
                this.setState({entities})
            )
    }

    render() {
        return (
            <div className={css.container}>
                <VideoListComponent entities={this.state.entities} />
            </div>
        )
    }
}