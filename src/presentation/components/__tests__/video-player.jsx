import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { VideoPlayerComponent } from '../video-player'
import movieMock from '../__mocks__/movie'

configure({ adapter: new Adapter() })

describe('<VideoPlayerComponent />', () => {
    it('calls componentDidMount', () => {
        sinon.spy(VideoPlayerComponent.prototype, 'componentDidMount')
        mount(
            <MemoryRouter>
                <VideoPlayerComponent data={movieMock} />
            </MemoryRouter>
        )
        expect(VideoPlayerComponent.prototype.componentDidMount).to.have.property('callCount', 1)
        VideoPlayerComponent.prototype.componentDidMount.restore()
    })

    it('renders movie title', () => {
        const wrapper = mount(
            <MemoryRouter>
                <VideoPlayerComponent data={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('h1').render().text()).to.equal(movieMock.title)
    })

    it('contains a video url', () => {
        const wrapper = mount(
            <MemoryRouter>
                <VideoPlayerComponent data={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('video').filterWhere((item) =>
            item.prop('src') === movieMock.video.url
        )).to.have.lengthOf(1)

    })
})