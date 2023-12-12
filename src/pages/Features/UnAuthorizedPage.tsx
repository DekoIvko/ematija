import { useNavigate } from "react-router";

const UnAuthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <h1 className="text-2xl text-red">Unauthorized!</h1>
      <br />
      <h4>You do not have access to do requested page!</h4>
      <div>
        <button className="p-2 bg-red-600 text-white" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
