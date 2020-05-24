import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { SelectedMovieComponent } from '../selected-movie'
import movieMock from '../__mocks__/movie'

configure({ adapter: new Adapter() })

describe('<SelectedMovieComponent />', () => {
    it('renders movie title', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('h1').render().text()).to.equal(movieMock.title)
    })

    it('renders movie description', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('p').render().text()).to.equal(movieMock.description)
    })

    it('renders movie year', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('span').at(0).render().text())
            .equal(movieMock.publishedDate.getFullYear())
    })

    it('renders movie rating', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('span').at(1).render().text())
            .equal(movieMock.rating)
    })

    it('renders movie categories', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('span').at(2).render().text()).equal(movieMock.categories.join(', '))
    })

    it('renders movie duration', () => {
        const wrapper = mount(
            <MemoryRouter>
                <SelectedMovieComponent movie={movieMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('time').render().text()).to.equal(movieMock.video.duration)
    })
    
})