export class AddTask {
    title: string;
    description: string;
    date: Date;
    time: string; // Can be stored in "HH:mm" format
    isRecurring: boolean;
    isCompleted: boolean = false;
       
}