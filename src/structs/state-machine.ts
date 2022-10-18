

export type State<Context, Result> = {
	name: string;
	handlerFunc: (context: Context) => Result;
	firstRun?: (context: Context) => void;
	cleanUp?: (context: Context) => void;
}

export class StateMachine<Context, Result> {

	private states: Map<string, State<Context, Result>> = new Map();
	private transitions: Map<string, string> = new Map();
	private currentState: State<Context, Result>;
	private running = false;

	addState(state: State<Context, Result>) {
		this.states.set(state.name, state);
		return this; // chainable
	}

	setInitialState(name: string) {
		this.currentState = this.states.get(name);
		return this; // chainable
	}

	addTransition(from: string, to: string) {
		this.transitions.set(from, to);
		return this; // chainable
	}

	run(context: Context) {
		if(!this.running) {
			this.running = true;
			this.currentState.firstRun?.(context);
		} 
		if(this.currentState) {
			const result = this.currentState.handlerFunc(context);
			if(result === null) {
				this.currentState.cleanUp?.(context);
				this.gotoNext(context);
				// run again
				this.run(context);
			} else {
				return result;
			}
		} else {
			// finish
			return null;
		}
	}

	private gotoNext(context: Context) {
		const newState = this.transitions.get(this.currentState.name);
		if(newState) {
			this.currentState = this.states.get(newState);
			this.currentState.firstRun?.(context);
		} else {
			// finish
			return null;
		}
	}
}