import {Button, Container, Spinner} from "react-bootstrap";
import {useContext} from "preact/hooks";
import {ComponentRouterContext} from "./ComponentRouter.tsx";
import Form from "./Form.tsx";

export default function PickerScreen() {
    const { setComponentRoute } = useContext(ComponentRouterContext);

    return (
        <Container as="main" className="p-3" style={{maxWidth: '960px'}}>
            <Spinner />
            <Button onClick={() => setComponentRoute(<Form />)}>Go back</Button>
        </Container>
    )
}