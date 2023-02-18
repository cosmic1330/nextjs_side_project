export type Task = {
    name: String,
    time: String, // todo: 時間排程，自動帶入番茄鐘或提醒。null = 放棄功能
    description: String,
    finish: Boolean,
    id:String,
}

export type Tasks = Task[]

export type CurrentTask = Task & { remainingTime: number, stop:boolean } | undefined;