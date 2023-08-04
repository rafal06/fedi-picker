import {Button, FormControl, FormLabel, FormText, Row} from "react-bootstrap";

export default function SettingsForm() {
    return (
        <Row className="g-3">
            <div>
                <FormLabel>Number of winners</FormLabel>
                <FormControl type="number" min={1} />
            </div>
            <div>
                <FormLabel>Must follow</FormLabel>
                <FormControl placeholder="@someone@example.social" />
                <FormText>Separate usernames with a comma</FormText>
            </div>
            <div>
                <Button disabled={true} variant="outline-primary" className="mt-2 w-100">Continue</Button> {/*A better name might be 'Select winner'*/}
            </div>
        </Row>
    )
}
