import { useSelector } from "react-redux";

export default function SessionName() {
    const userInformation = useSelector((state) => state.session.userInformation);
    return (
        <div>
            {'username' in userInformation ? "Welcome " + userInformation.username + "!": ""}
        </div>
    );
}