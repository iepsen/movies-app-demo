import { MoviesService } from "../data/movies-service";

export class MoviesInteractor {
    get() {
        return new MoviesService().get()
    }
}