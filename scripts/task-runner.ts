export const runTask = <T>(task: () => Promise<T>): Promise<T> => task()

export const runTasks = <T>(
  tasks: ReadonlyArray<() => Promise<T>>,
): Promise<T[]> => Promise.all(tasks.map((task) => runTask(task)))
