import {FormControl, FormLabel} from "react-bootstrap";

export default function PostUrlInput() {
    return (
        <>
            <FormLabel>Post URL</FormLabel>
            <FormControl placeholder="https://example.social/@someone/110815462944644507" />
        </>
    )
}
