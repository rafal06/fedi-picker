import {createContext, JSX} from "preact";
import {useContext, useMemo, useState} from "preact/hooks";
// import {JSXInternal} from "preact/src/jsx";

export const ComponentRouterContext = createContext<{
    _componentRoute: JSX.Element;
    setComponentRoute: (value: (((prevState: JSX.Element) => JSX.Element) | JSX.Element)) => void
}>({
    _componentRoute: <></>,
    setComponentRoute: () => {},
});

export function ComponentRouterProvider(props: {
    children: any,
    defaultRoute: JSX.Element,
}) {
    const [_componentRoute, setComponentRoute] = useState(props.defaultRoute);
    const componentRouteMemo = useMemo(() => {
        return { _componentRoute, setComponentRoute }
    }, [_componentRoute]);

    return (
        <ComponentRouterContext.Provider value={componentRouteMemo}>
            {props.children}
        </ComponentRouterContext.Provider>
    )
}

export function ComponentRouteSlot() {
    const { _componentRoute } = useContext(ComponentRouterContext);
    return _componentRoute;
}
