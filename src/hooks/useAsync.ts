import { useEffect, useMemo, useState } from 'react';

interface AsyncProto<Result, Err> {
  match<OnPending, OnRejected, OnFulfilled>(cases: {
    onPending: () => OnPending;
    onRejected: (err: Err) => OnRejected;
    onFulfilled: (result: Result) => OnFulfilled;
  }): OnPending | OnRejected | OnFulfilled;
}

interface Pending<Result, Err> extends AsyncProto<Result, Err> {
  isPending: true;
  isRejected: false;
  isFulfilled: false;
}

interface Rejected<Result, Err> extends AsyncProto<Result, Err> {
  isPending: false;
  isRejected: true;
  isFulfilled: false;
  getError(): Err;
}

interface Fulfilled<Result, Err> extends AsyncProto<Result, Err> {
  isPending: false;
  isRejected: false;
  isFulfilled: true;
  getResult(): Result;
}

export type Async<Result, Err extends Error = Error> =
  | Pending<Result, Err>
  | Rejected<Result, Err>
  | Fulfilled<Result, Err>;

export function createAsync<Result, Err extends Error>(
  result: Result | undefined,
  error: Err | undefined,
  pending: boolean,
): Async<Result, Err> {
  const isPending = pending;
  const isRejected = error !== undefined;
  const isFulfilled = result !== undefined;

  function match<OnPending, OnRejected, OnFulfilled>(cases: {
    onPending: () => OnPending;
    onRejected: (err: Err) => OnRejected;
    onFulfilled: (result: Result) => OnFulfilled;
  }) {
    if (isPending) {
      return cases.onPending();
    }

    if (isRejected) {
      return cases.onRejected(getError());
    }

    return cases.onFulfilled(getResult());
  }

  function getError() {
    if (error === undefined) {
      throw new Error(
        '현재 비동기 값은 Rejected 상태가 아니기 때문에 에러를 가져올 수 없습니다.',
      );
    }

    return error;
  }

  function getResult() {
    if (result === undefined) {
      throw new Error(
        '현재 비동기 값은 Fulfilled 상태가 아니기 때문에 결과를 가져올 수 없습니다.',
      );
    }

    return result;
  }

  return {
    isPending,
    isRejected,
    isFulfilled,
    match,
    getError,
    getResult,
  } as Async<Result, Err>;
}

/**
 * Promise를 편하게 사용할 수 있도록 Async 객체를 반환합니다.
 * @param promise 값을 가져올 비동기 Promise
 * @param dependencies 값을 새로 가져올지 결정하는 의존성
 */
export function useAsync<Result, Err extends Error = Error>(
  promise: () => Promise<Result>,
  dependencies: any[] = [],
): Async<Result, Err> {
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<Err | undefined>(undefined);

  useEffect(() => {
    promise()
      .then(setResult)
      .catch(setError)
      .then(() => setIsPending(false));
  }, dependencies);

  const memoedAsync = useMemo(
    () => createAsync(result, error, isPending),
    [result, error, isPending],
  );

  return memoedAsync;
}

/**
 * Promise를 편하게 사용할 수 있도록 T | undefined를 반환합니다. Promise의 값이 채워지면 T, 아니면 undefined를 반환합니다.
 * @param promise 값을 가져올 비동기 Promise
 * @param dependencies 값을 새로 가져올지 결정하는 의존성
 */
export function useSimpleAsync<Result>(
  promise: () => Promise<Result>,
  dependencies: any[] = [],
): Result | undefined {
  const asyncValue = useAsync(promise, dependencies);

  return asyncValue.isFulfilled ? asyncValue.getResult() : undefined;
}
