import { Component, type ReactNode } from "react";
import styles from './Card.module.css';

interface IProps {
  name: string,
  url: string,
}

interface IState {
  image: string,
}

class Card extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      image: '',
    }
  }

  async componentDidMount(): Promise<void> {
    const endpoint = this.props.url;
    try {
      const response = await fetch(`${endpoint}`);
      const data = await response.json();
      this.setState({image: data.sprites.front_default});
    } catch (error) {
      console.log(error)
    }
  }
  
  render(): ReactNode {
    return <div className={styles.card}>
      <p>{this.props.name}</p>
      <img src={this.state.image} />
    </div>
  }
}

export default Card;