import "./StatusMessage.scss";

interface IProps {
  from: string;
  status: "error" | "success";
  message?: string;
  boldText?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

function StatusMessage({
  from,
  status,
  message,
  boldText,
  align,
  className,
}: IProps) {
  function getAlignmentCss() {
    switch (align) {
      case "left":
        return "justify-content-start";
      case "center":
        return "justify-content-center";
      case "right":
        return "justify-content-end";
      default:
        return "";
    }
  }
  return (
    <div className="status-message-body">
      <div className={`${className} ${from}`}>
        <div className={`flex flex-row icons-message ${getAlignmentCss()}`}>
          {status === "error" && <i className="bi bi-bug-fill"></i>}
          {status === "success" && <i className="bi bi-check-lg"></i>}
          <span
            className={`text-center ${
              status === "error" ? "errorMsg" : "successMsg"
            } ${boldText ? "font-weight-bold" : ""}`}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusMessage;

StatusMessage.defaultProps = {
  message: "",
  className: "",
  boldText: true,
  align: "center",
  modal: false,
};
