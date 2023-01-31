import { useSelector } from "react-redux";
import '../styles/SessionName.css';

export default function SessionName() {
    const userInformation = useSelector((state) => state.session.userInformation);
    return (
        <div className="session-name">
            {'username' in userInformation ? "Welcome " + userInformation.username + "!": ""}
        </div>
    );
}