import { useNavigate } from "react-router-dom";

const instance = useNavigate();
export const navigate = (param) => {
    instance(param);
}
