import { FocusState } from './FocusState'
export class FocusAreaState extends FocusState {
  private static instance: FocusAreaState

  public static getInstance() {
    if (!FocusAreaState.instance) {
      FocusAreaState.instance = new FocusAreaState()
    }
    return FocusAreaState.instance
  }
}
