import {Col, Container, Row} from "react-bootstrap";
import PostUrlInput from "./settings-form/PostUrlInput.tsx";
import PostPreview from "./PostPreview.tsx";
import SettingsForm from "./SettingsForm.tsx";

export default function Form() {
    return (
        <Container as="main" className="p-3" style={{maxWidth: '960px'}}>
            <Row className="my-4 justify-content-center">
                <Col md={8} style={{maxWidth: '616px'}}>
                    <PostUrlInput />
                </Col>
            </Row>
            <Row className="my-4">
                <Col className="mb-4">
                    <h2 className="mb-3 fs-4">Post preview</h2>
                    <PostPreview
                        authorPfpUrl="https://cdn.fosstodon.org/accounts/avatars/109/446/837/388/460/861/original/db79f3cf896dd4d1.png"
                        authorNick="rafal06"
                        authorUsername="@rafal06@fosstodon.org"
                        contents="Hello world!"
                    />
                </Col>
                <Col>
                    <Row>
                        <h2 className="mb-3 fs-4">Settings</h2>
                    </Row>
                    <SettingsForm />
                </Col>
            </Row>
        </Container>
    )
}
