export type Result<T, E> = ResultClass<T, E> & (Ok<T> | Err<E>);

export const Result = {
  ok: <T>(value: T): Result<T, never> => new Ok(value),
  err: <E>(err: E): Result<never, E> => new Err(err),
  all: <T, E>(results: Result<T, E>[]): Result<T[], E> => {
    const errResults = results.find((result) => result.isErr());
    if (errResults) {
      return Result.err(errResults.unwrapErr());
    }
    return Result.ok(results.map((result) => result.unwrap()));
  },
};

abstract class ResultClass<T, E> {
  constructor(
    protected data:
      | {
          ok: true;
          value: T;
        }
      | {
          ok: false;
          err: E;
        },
  ) {}

  /**
   * Map the value if the result is an Ok and then flatten the result
   * @example
   * const result = Result.ok(1); // Result<1, never>
   * result.andThen(value => Result.ok(value + 1)); // Result<2, never>
   */
  andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, E | F> {
    if (this.data.ok) {
      return fn(this.data.value);
    }
    return Result.err(this.data.err);
  }

  /**
   * Calls the provided closure with a reference to the contained error (if Err).
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * result.inspectErr(err => console.log(err)); // Result<never, 'error'>
   */
  inspectErr(fn: (err: E) => unknown): Result<T, E> {
    if (!this.data.ok) {
      fn(this.data.err);
    }
    return this.data.ok
      ? Result.ok(this.data.value)
      : Result.err(this.data.err);
  }

  /**
   * Calls the provided closure with a reference to the contained value (if Ok).
   * @example
   * const result = Result.ok('success'); // Result<'success', never>
   * result.inspectOk(value => console.log(value)); // Result<'success', never>
   */
  inspectOk(fn: (value: T) => unknown): Result<T, E> {
    if (this.data.ok) {
      fn(this.data.value);
    }
    return this.data.ok
      ? Result.ok(this.data.value)
      : Result.err(this.data.err);
  }

  /**
   * Predicate to know if the result is an Ok
   * @example
   * const result = Result.ok(1); // Result<1, never>
   * if (result.isOk()) {
   *  console.log(result.value); // Ok<number>
   * }
   */
  isOk(): this is Ok<T> {
    return this.data.ok === true;
  }

  /**
   * Predicate to know if the result is an Ok and the value match the predicate
   * @example
   * const result = Result.ok(1); // Result<1, never>
   * if (result.isOkAnd((value) => value === 1)) {
   *  console.log(result.value); // Ok<1>
   * }
   */
  isOkAnd<U extends T>(predicate: (value: T) => value is U): this is Ok<U> {
    return this.data.ok === true && predicate(this.data.value);
  }

  /**
   * Predicate to know if the result is an Err
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * if (result.isErr()) {
   *   console.log(result.err); // Err<string>
   * }
   */
  isErr(): this is Err<E> {
    return this.data.ok === false;
  }

  /**
   * Predicate to know if the result is an Err and the error match the predicate
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * if (result.isErrAnd((err) => err === 'error')) {
   *  console.log(result.err); // Err<'error'>
   * }
   */
  isErrAnd<F extends E>(predicate: (err: E) => err is F): this is Err<F> {
    return this.data.ok === false && predicate(this.data.err);
  }

  /**
   * Map the value if the result is an Ok
   * @example
   * const result = Result.ok(1); // Result<1, never>
   * result.map(value => value + 1); // Result<2, never>
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.data.ok === true) {
      return Result.ok(fn(this.data.value));
    }
    return Result.err(this.data.err);
  }

  /**
   * Map the error if the result is an Err
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * result.mapErr(err => `A_${err}`); // Result<never, 'A_error'>
   */
  mapErr<F>(fn: (value: E) => F): Result<T, F> {
    if (this.data.ok === false) {
      return Result.err(fn(this.data.err));
    }
    return Result.ok(this.data.value);
  }

  /**
   * Map both values and unwrap the result into an union type
   * @example
   * const result = Result.ok(new Date('2011-10-05T14:48:00.000Z'));
   * result.mapOrElse((ok) => ok, (err) => new Date()); // Date
   */
  mapOrElse<U, F>(okFn: (value: T) => U, errFn: (err: E) => F): U | F {
    if (this.data.ok === true) {
      return okFn(this.data.value);
    }
    return errFn(this.data.err);
  }

  /**
   * Converts from Result<T, E> to T | undefined, and discarding the error, if any.
   */
  ok(): T | undefined {
    if (this.data.ok === false) {
      return undefined;
    }
    return this.data.value;
  }

  /**
   * Peek into a success value and perform any result operation, without changing the returning value of the original Result.
   * @example
   * const result = Result.ok('1'); // Result<'1', never>
   * result.tap(() => Result.err('ERR')); // Result<'1', 'ERR'>
   */
  tap<F>(fn: (value: T) => Result<unknown, F>): Result<T, E | F> {
    if (this.data.ok === true) {
      const value = this.data.value;
      return fn(value).map(() => value);
    }
    return Result.err(this.data.err);
  }

  /**
   * Unwrap the result if it is Ok or throw an error
   * @throws This will throw an Error if the Result is an Err
   * @example
   * const result = Result.ok(1); // Result<1, never>
   * result.unwrap(); // 1
   */
  unwrap(onErr?: (err: E) => void): T {
    if (this.data.ok === false) {
      if (onErr) {
        onErr(this.data.err);
      }
      throw new Error(String(this.data.err));
    }
    return this.data.value;
  }

  /**
   * Unwrap the result if it is Err or throw an error
   * @throws This will throw an Error if the Result is an Ok
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * result.unwrapErr(); // 'error'
   */
  unwrapErr(onOk?: (value: T) => void): E {
    if (this.data.ok === true) {
      if (onOk) {
        onOk(this.data.value);
      }
      throw new Error('Cannot unwrapErr an Ok');
    }
    return this.data.err;
  }

  /**
   * Unwrap with a default value if the Result is an Err
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * result.unwrapOr(2); // 2
   */
  unwrapOr<F>(defaultValue: F): T | F {
    if (this.data.ok === false) {
      return defaultValue;
    }
    return this.data.value;
  }

  /**
   * Unwrap with a default function if the Result is an Err
   * @example
   * const result = Result.err('error'); // Result<never, 'error'>
   * result.unwrapOrElse((err) => `A_${err}`); // 'A_error'
   */
  unwrapOrElse<F>(fn: (err: E) => F): T | F {
    if (this.data.ok === false) {
      return fn(this.data.err);
    }
    return this.data.value;
  }
}

class Ok<T> extends ResultClass<T, never> {
  constructor(public value: T) {
    super({ ok: true, value });
  }
}

class Err<E> extends ResultClass<never, E> {
  constructor(public err: E) {
    super({ ok: false, err });
  }
}
