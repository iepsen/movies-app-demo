import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configure, mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { MovieItemComponent } from '../movie-item'

configure({ adapter: new Adapter() })

const movie = {
    id: '10-things-i-hate-about-you',
    title: '10 Things I Hate About You',
    description: 'A new kid must find a guy to date the meanest girl in school, the older sister of the girl he has a crush on, who cannot date until her older sister does.',
    image: {
        url: 'https://picsum.photos/200/500?t=1'
    },
    movie: {
        pathname: '/movie/10-things-i-hate-about-you',
        state: {
            movie: {}
        }
    },
    getLink: jest.fn(() => '/movie/10-things-i-hate-about-you')
}

describe('<MovieItemComponent />', () => {
    it('calls componentDidMount', () => {
        sinon.spy(MovieItemComponent.prototype, 'componentDidMount')
        mount(
            <MemoryRouter>
                <MovieItemComponent 
                    onMount={jest.fn()} 
                    key={0} 
                    index={0}
                    movie={movie}
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
                    movie={movie}
                    hasFocus={false}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('li a img').filterWhere((item) => 
            item.prop('src') === movie.image.url
        )).to.have.lengthOf(1)
    })
})