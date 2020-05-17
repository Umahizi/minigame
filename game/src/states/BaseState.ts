export default abstract class BaseState {

    protected next: BaseState;

    registerNext(next: BaseState) {
        this.next = next;
    }

    abstract enter();

    exit() {
        if (this.canExit()) {
            this.next.enter();
        }
    }

    canExit(): boolean {
        return this.next != null && this.next != undefined;
    }
}