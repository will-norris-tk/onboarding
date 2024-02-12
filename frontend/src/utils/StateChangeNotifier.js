class StateChangeNotifier {
    constructor(state, stateSetter) {
        this.stateSetter = stateSetter;
        this.state = state;
    }

    notifyStateChange() {
        this.stateSetter(!this.state);
    }
}

export default StateChangeNotifier;