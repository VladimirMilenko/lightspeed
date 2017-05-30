/**
 * Created by netre on 30.05.2017.
 */
export default  function asyncClientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof  action === 'function') {
                return action(dispatch, getState);
            }

            const {promise, types, ...rest} = action;

            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});

            const actionPromise = promise(client);

            actionPromise
                .then(
                    (result) => next({...rest, result, type: SUCCESS}),
                    (error) => next({...rest, error, type: FAILURE})
                )
                .catch((error) => {
                    next({...rest, error, type: FAILURE})
                });

            return actionPromise;

        };
    }
}