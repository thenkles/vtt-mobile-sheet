type CallbackFunction<TData> = (data: TData) => void;


export class Signals<TData> {
    private listeners: CallbackFunction<TData>[] = [];

    subscribe(callback: CallbackFunction<TData>): () => void {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    unsubscribe(callback: CallbackFunction<TData>): void {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    dispatch(data: TData): void {
        this.listeners.forEach(listener => listener(data));
    }
}