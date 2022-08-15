import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Tip</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const author = this.tipAuthor.value
          const description = this.tipDescription.value
          this.props.createTip(author,description)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="tipAuthor"
              type="text"
              ref={(input) => { this.tipAuthor = input }}
              className="form-control"
              placeholder="Tip Author"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="tipDescription"
              type="text"
              ref={(input) => { this.tipDescription = input }}
              className="form-control"
              placeholder="Tip Description"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Tip</button>
        </form>
        <p>&nbsp;</p>
        <h2>List of all Tips</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.tips.map((tip, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{tip.id.toString()}</th>
                  <td>{tip.author}</td>
                  <td>{tip.description}</td>
                  <td>{tip.owner}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
