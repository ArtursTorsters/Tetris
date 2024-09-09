import { useNavigate} from "react-router-dom";

export const BackBtn = () => {
    let navigate = useNavigate();
    return (
        <>
          <button className="bg-slate-500" onClick={() => navigate(-1)}>Back</button> 
        </>
    );
};