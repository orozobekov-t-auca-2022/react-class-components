interface IErrorListProps {
  message: string;
}

const ErrorList = (props: IErrorListProps) => {
  const { message } = props;

  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
};

export default ErrorList;
