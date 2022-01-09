import { FocusState } from './FocusState'
export class FocusNodeState extends FocusState {
  private static instance: FocusNodeState

  public static getInstance() {
    if (!FocusNodeState.instance) {
      FocusNodeState.instance = new FocusNodeState()
    }
    return FocusNodeState.instance
  }
}
