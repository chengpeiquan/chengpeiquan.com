import { expect, test } from 'vitest'
import { runTask, runTasks } from '../task-runner'

interface Deferred<T> {
  promise: Promise<T>
  reject: (reason?: unknown) => void
  resolve: (value: T | PromiseLike<T>) => void
}

const createDeferred = <T>(): Deferred<T> => {
  let resolve!: Deferred<T>['resolve']
  let reject!: Deferred<T>['reject']

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, reject, resolve }
}

test('runTask waits for the task promise to settle', async () => {
  const deferred = createDeferred<string>()
  const task = runTask(() => deferred.promise)

  let settled = false
  void task.then(() => {
    settled = true
  })

  await Promise.resolve()
  expect(settled).toBe(false)

  deferred.resolve('done')

  expect(await task).toBe('done')
  expect(settled).toBe(true)
})

test('runTasks waits for every task and preserves result order', async () => {
  const first = createDeferred<string>()
  const second = createDeferred<string>()
  const task = runTasks([() => first.promise, () => second.promise])

  let settled = false
  void task.then(() => {
    settled = true
  })

  await Promise.resolve()
  expect(settled).toBe(false)

  first.resolve('first')
  await Promise.resolve()
  expect(settled).toBe(false)

  second.resolve('second')

  expect(await task).toEqual(['first', 'second'])
  expect(settled).toBe(true)
})

test('runTasks rejects when any task fails', async () => {
  const error = new Error('task failed')

  try {
    await runTasks([async () => 'ok', async () => Promise.reject(error)])
  } catch (caught) {
    expect(caught).toBe(error)
    return
  }

  throw new Error('Expected runTasks to reject')
})
