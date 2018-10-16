export default {
    id: '10-things-i-hate-about-you',
    title: '10 Things I Hate About You',
    description: 'A new kid must find a guy to date the meanest girl in school, the older sister of the girl he has a crush on, who cannot date until her older sister does.',
    image: 'https://picsum.photos/200/500?t=1',
    movie: {
        pathname: '/movie/10-things-i-hate-about-you',
        state: {
            movie: {}
        }
    },
    video: {
        url: 'http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4'
    },
    categories: [
        { 'title': 'Comedy', 'description': 'Comedy movies', 'id': 'movies-comedy' },
        { 'title': 'Drama', 'description': 'Drama movies', 'id': 'movies-drama' },
        { 'title': 'Romance', 'description': 'Romantic movies', 'id': 'movies-romance'}
    ],
    publishedDate: {
        getFullYear: jest.fn(() => '1999')
    },
    getLink: jest.fn(() => '/movie/10-things-i-hate-about-you'),
    rating: 'PG-13'
}