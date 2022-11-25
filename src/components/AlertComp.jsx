import { Alert } from "react-bootstrap"

const Alerts = () => {
    return ( 
        <Alert variant="danger" className="mt-3">
            <Alert.Heading>
                Oh no! An error has occurred.
            </Alert.Heading>
        </Alert>
     );
}
 
export default Alerts;