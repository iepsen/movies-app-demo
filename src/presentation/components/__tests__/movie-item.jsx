import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { MovieItemComponent } from '../movie-item'
import movieMock from '../__mocks__/movie'

configure({ adapter: new Adapter() })

describe('<MovieItemComponent />', () => {
    it('calls componentDidMount', () => {
        sinon.spy(MovieItemComponent.prototype, 'componentDidMount')
        mount(
            <MemoryRouter>
                <MovieItemComponent 
                    onMount={jest.fn()} 
                    key={0} 
                    index={0}
                    movie={movieMock}
                    hasFocus={false}
                />
            </MemoryRouter>
        )
        expect(MovieItemComponent.prototype.componentDidMount).to.have.property('callCount', 1)
        MovieItemComponent.prototype.componentDidMount.restore()
    })

    it('renders an image', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MovieItemComponent 
                    onMount={jest.fn()} 
                    key={0} 
                    index={0}
                    movie={movieMock}
                    hasFocus={false}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('img').filterWhere((item) => 
            item.prop('src') === movieMock.image
        )).to.have.lengthOf(1)
    })

    it('has a link to movie', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MovieItemComponent 
                    onMount={jest.fn()} 
                    key={0} 
                    index={0}
                    movie={movieMock}
                    hasFocus={false}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('a').filterWhere((item) =>
            item.prop('href') === movieMock.getLink()
        )).to.have.lengthOf(1)
    })
})