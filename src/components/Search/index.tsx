import { Component, type ReactNode } from "react";
import { type SubmitEvent } from "react";

interface ISearchProps {
  onSubmit: (e: SubmitEvent<Element>) => void,
}

class Search extends Component<ISearchProps> {
  constructor(props: ISearchProps){
    super(props);
  }

  render(): ReactNode {
    return (
      <section className='search'>
        <form onSubmit={this.props.onSubmit}>
          <label htmlFor="search_input"></label>
          <input id="search_input"/>
          <button type="submit">Search</button>
        </form>
      </section>
    )
  }
}

export default Search;