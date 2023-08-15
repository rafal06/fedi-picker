import {Col, Container, Row} from "react-bootstrap";
import PostDataProvider from "./PostDataContext.tsx";
import PostUrlInput from "./settings-form/PostUrlInput.tsx";
import PostPreview from "./PostPreview.tsx";
import SettingsForm from "./SettingsForm.tsx";

export default function Form() {
    return (
        <Container as="main" className="p-3" style={{maxWidth: '960px'}}>
            <PostDataProvider>
                <Row className="my-4 justify-content-center">
                    <Col md={8} style={{maxWidth: '616px'}}>
                        <PostUrlInput />
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col className="mb-4">
                        <h2 className="mb-3 fs-4">Post preview</h2>
                        <PostPreview />
                    </Col>
                    <Col>
                        <Row>
                            <h2 className="mb-3 fs-4">Settings</h2>
                        </Row>
                        <SettingsForm />
                    </Col>
                </Row>
            </PostDataProvider>
        </Container>
    )
}
