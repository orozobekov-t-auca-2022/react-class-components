import { Component, type ReactNode } from "react";
import styles from './Card.module.css';

interface IProps {
  name: string,
  url: string,
}

interface IState {
  image: string,
  description: string,
  id: number,
}

class Card extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      image: '',
      description: '',
      id: -1,
    }
  }

  async componentDidMount(): Promise<void> {
    const endpoint = this.props.url;
    try {
      const response = await fetch(`${endpoint}`);
      if(!response.ok) {
        throw new Error('Something wrong with response');
      }
      const data = await response.json();
      this.setState({image: data.sprites.front_default, id: data.id});
    } catch (error) {
      console.error(error)
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_POKE_SPECIE_API_KEY}/${this.state.id}`);
      if(!response.ok) {
        throw new Error('Something wrong with response');
      }
      const data = await response.json();
      this.setState({description: data.flavor_text_entries.filter((text: {language: {name: string}}) => text.language.name === 'en')[0].flavor_text});
    } catch (error) {
      console.log(error)
    }
  }
  
  render(): ReactNode {
    return (
    <div className={styles.card}>
      <h2>{this.props.name}</h2>
      <img src={this.state.image} />
      <p>{this.state.description}</p>
    </div>
    )
  }
}

export default Card;