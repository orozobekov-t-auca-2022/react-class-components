import { Component, type ReactNode } from 'react';

interface IErrorListProps {
  message: string;
}

class ErrorList extends Component<IErrorListProps> {
  render(): ReactNode {
    return (
      <div>
        <h3>{this.props.message}</h3>
      </div>
    );
  }
}

export default ErrorList;
