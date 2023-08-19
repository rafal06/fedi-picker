import {Button, Container, Spinner} from "react-bootstrap";
import {useContext, useEffect, useState} from "preact/hooks";
import {ComponentRouterContext} from "./ComponentRouter.tsx";
import Form from "./Form.tsx";

export default function PickerScreen() {
    const { setComponentRoute } = useContext(ComponentRouterContext);
    const [state, setState] = useState<{
        loading: boolean,
        error: null | Error,
    }>({
        loading: true,
        error: null,
    });

    useEffect(() => {
        setTimeout(() => {
            setState({
                loading: false,
                error: new Error('Not implemented'),
            });
        }, 3000);
    });

    if (state.loading) return (
        <CenterContainer>
            <Spinner className="mb-3" />
            <p>Loading data...</p>
            <Button onClick={() => setComponentRoute(<Form />)}>Go back</Button>
        </CenterContainer>
    )

    if (state.error) return (
        <CenterContainer>
            <h2 class="fs-4">Error loading data</h2>
            <p>{state.error.message}</p>

            <div class="d-flex">
                <Button variant="outline-primary" onClick={() => setComponentRoute(<Form />)}>Go back</Button>
                <Button className="ms-3" onClick={() => {}}>Retry</Button>
            </div>
        </CenterContainer>
    )

    return (
        <Container as="main" className="p-3" style={{maxWidth: '960px'}}>
            <h2 className="fs-4">Not implemented</h2>
            <Button onClick={() => setComponentRoute(<Form />)}>Go back</Button>
        </Container>
    )
}

function CenterContainer(props: any) {
    return (
        <Container as="main"
                   className="p-3 d-flex flex-column justify-content-center align-items-center"
                   style={{maxWidth: '960px', marginTop: '200px'}}>
            {props.children}
        </Container>
    )
}
